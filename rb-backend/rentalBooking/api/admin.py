# backend/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import AuthenticationForm
from .models import User

class CustomUserAdmin(UserAdmin):
    form = AuthenticationForm
    add_fieldsets = (
        (None, {
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

# Register the custom User model with the custom UserAdmin
admin.site.register(User, CustomUserAdmin)
admin.site.login_form = AuthenticationForm
admin.site.login_template = 'admin/login.html'