from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Rental, Booking, StatusChoices, User
from django.db.models import Q
from .serializers import RentalSerializer, BookingSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth import get_user_model
from .tasks import send_password_reset_email 
from rest_framework.decorators import api_view, permission_classes
from allauth.socialaccount.models import SocialAccount
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import generics

User = get_user_model()

class RentalViewSet(ModelViewSet):
    """
    API ViewSet for managing rentals.
    Optimized for performance & scalability.
    """
    queryset = Rental.objects.select_related('host').all()
    serializer_class = RentalSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['location', 'price', 'is_available', 'category']
    search_fields = ['title', 'description']
    ordering_fields = ['price', 'created_at']

    def create(self, request, *args, **kwargs):
        """ POST method for creating a rental (Optimized) """
        serializer = RentalSerializer(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                rental = serializer.save(host=request.user)
                return Response(RentalSerializer(rental).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingViewSet(ModelViewSet):
    """
    API ViewSet for managing bookings.
    Optimized for filtering, searching, and performance.
    """
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['rental', 'guest', 'status', 'start_date', 'end_date', 'rental__category']
    search_fields = ['rental__title', 'guest__first_name', 'guest__last_name', 'renal__category__name']
    ordering_fields = ['start_date', 'end_date', 'status']

    def get_queryset(self):
        """ Optimize filtering for renters and hosts. """
        user = self.request.user
        return Booking.objects.select_related('rental', 'guest').filter(
            Q(guest=user) | Q(rental__host=user)
        ) if user.is_authenticated else Booking.objects.none()

    def create(self, request, *args, **kwargs):
        """ Optimized booking creation with availability check. """
        user = request.user
        if user.role != 'renter':
            return Response({"detail": "Only renters can create bookings."}, status=status.HTTP_403_FORBIDDEN)

        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save(guest=user, status=StatusChoices.PENDING)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """ Optimize booking update to restrict updates to the host. """
        booking = self.get_object()

        if request.user != booking.rental.host:
            return Response({"detail": "Only the host can update the booking status."}, status=status.HTTP_403_FORBIDDEN)

        serializer = BookingSerializer(booking, data=request.data, partial=True)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """ Allow renters and hosts to cancel bookings. """
        booking = self.get_object()

        if request.user not in [booking.guest, booking.rental.host]:
            return Response({"detail": "Only the guest or host can cancel this booking."}, status=status.HTTP_403_FORBIDDEN)

        with transaction.atomic():
            booking.status = StatusChoices.CANCELLED
            booking.save()
            return Response({"detail": "Booking has been cancelled."}, status=status.HTTP_200_OK)
        
class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get("email")
        try:
            user = User.objects.get(email=email)
            token = PasswordResetTokenGenerator().make_token(user)
            send_password_reset_email.delay(user.email, token)  # Async with Celery
            return Response({"message": "Password reset email sent."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    return Response({
        "email": request.user.email,
        "first_name": request.user.first_name,
        "last_name": request.user.last_name
    })

@api_view(['GET'])
def google_callback(request):
    # Get the Google social account
    social_account = SocialAccount.objects.get(user=request.user)
    
    # Get or create the token
    token, created = Token.objects.get_or_create(user=request.user)
    
    # Redirect to frontend with token
    frontend_url = f"http://localhost:3000/auth/google/callback?token={token.key}"
    return Response({"redirect": frontend_url}, status=302, headers={'Location': frontend_url})

class SignUpView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(request=request)
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "message": "User created successfully",
                    "token": token.key,
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
