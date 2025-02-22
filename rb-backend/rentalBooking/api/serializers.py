from rest_framework import serializers
from .models import Rental, Booking, StatusChoices
from django.db.models import Q
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework.authtoken.models import Token

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['status', 'created_at', 'updated_at']

    def validate(self, data):
        """
        Ensure booking dates are valid and availability is checked.
        """
        if data['start_date'] >= data['end_date']:
            raise serializers.ValidationError("End date must be after start date.")

        overlapping_bookings = Booking.objects.filter(
            rental=data['rental'],
            status__in=[StatusChoices.PENDING, StatusChoices.CONFIRMED]
        ).filter(
            Q(start_date__lt=data['end_date'], end_date__gt=data['start_date'])
        )

        if overlapping_bookings.exists():
            raise serializers.ValidationError("This rental is already booked for the selected dates.")

        return data
    
class CustomRegisterSerializer(RegisterSerializer):
    def save(self, request):
        user = super().save(request)
        Token.objects.create(user=user) 
        return user
