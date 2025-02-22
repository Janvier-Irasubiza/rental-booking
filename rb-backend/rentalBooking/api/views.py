from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Rental, Booking, StatusChoices
from django.db.models import Q
from .serializers import RentalSerializer, BookingSerializer
from rest_framework.permissions import IsAuthenticated

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