from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist

class RoleChoices(models.TextChoices):
    SUPERUSER = 'superuser', _('Superuser')
    RENTER = 'renter', _('Renter')
    HOST = 'host', _('Host')

class StatusChoices(models.TextChoices):
    PENDING = 'pending', _('Pending')
    CONFIRMED = 'confirmed', _('Confirmed')
    CANCELLED = 'cancelled', _('Cancelled')
    REJECTED = 'rejected', _('Rejected')

class Categories(models.TextChoices):
    REAL_ESTATE = 'real_estate', _('Real Estate')
    VEHICLES = 'vehicles', _('Vehicles')
    EQUIPMENT = 'equipment', _('Equipment')
    LIFE_STYLE = 'life_style', _('Life & Style')

def get_default_category():
    try:
        return Category.objects.get(name=Categories.REAL_ESTATE).id
    except ObjectDoesNotExist:
        return None

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a regular user with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', RoleChoices.SUPERUSER)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(_('phone number'), max_length=15, blank=True, null=True)
    role = models.CharField(
        _('role'),
        max_length=20,
        choices=RoleChoices.choices,
        default=RoleChoices.RENTER
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    @property
    def is_host(self):
        return self.role == RoleChoices.HOST

    @property
    def is_renter(self):
        return self.role == RoleChoices.RENTER
    
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_('The groups this user belongs to.'),
        related_name="custom_user_set",
        related_query_name="custom_user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name="custom_user_set",
        related_query_name="custom_user",
    )

class Category(models.Model):
    name = models.CharField(
        _('name'), max_length=100, 
        db_index=True, 
        choices=Categories.choices, 
        default=Categories.REAL_ESTATE
    )
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)

    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')

    def __str__(self):
        return self.name

class Rental(models.Model):
    title = models.CharField(_('title'), max_length=100, db_index=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='rentals',
        default=get_default_category
    )
    price = models.DecimalField(
        _('price per night'),
        max_digits=10,
        decimal_places=2,
        db_index=True
    )
    location = models.CharField(_('location'), max_length=255, db_index=True)
    host = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='rentals',
        limit_choices_to={'role': RoleChoices.HOST}
    )
    description = models.TextField(_('description'), blank=True, db_index=True)
    is_available = models.BooleanField(_('available'), default=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('rental')
        verbose_name_plural = _('rentals')

    def __str__(self):
        return self.title

class Booking(models.Model):
    rental = models.ForeignKey(
        Rental,
        on_delete=models.CASCADE,
        related_name='bookings'
    )
    start_date = models.DateField(_('start date'))
    end_date = models.DateField(_('end date'))
    guest = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='bookings',
        limit_choices_to={'role': 'renter'}
    )
    status = models.CharField(
        _('status'),
        max_length=20,
        choices=StatusChoices.choices,
        default=StatusChoices.PENDING
    )
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)

    class Meta:
        ordering = ['-start_date']
        verbose_name = _('booking')
        verbose_name_plural = _('bookings')
        constraints = [
            models.CheckConstraint(
                check=models.Q(start_date__lt=models.F('end_date')),
                name='check_start_date_before_end_date'
            )
        ]

    def __str__(self):
        return f'{self.rental.title} ({self.start_date} - {self.end_date})'

    def clean(self):
        """
        Prevent double bookings by checking for date overlaps.
        """
        overlapping_bookings = Booking.objects.filter(
            rental=self.rental,
            status__in=[StatusChoices.PENDING, StatusChoices.CONFIRMED]
        ).filter(
            Q(start_date__lt=self.end_date, end_date__gt=self.start_date)
        )

        if overlapping_bookings.exists():
            raise ValidationError(_('This rental is already booked for the selected dates.'))

    def save(self, *args, **kwargs):
        self.clean()  # Validate before saving
        super().save(*args, **kwargs)