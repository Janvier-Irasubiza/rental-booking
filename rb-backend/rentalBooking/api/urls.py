from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RentalViewSet, BookingViewSet

router = DefaultRouter()
router.register(r'rentals', RentalViewSet, basename='rental')
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = [
    path('', include(router.urls)),
]
