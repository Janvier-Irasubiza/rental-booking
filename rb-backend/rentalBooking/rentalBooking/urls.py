from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from allauth.socialaccount.providers.google import views as google_views
from api.views import SignUpView, get_user_info, google_callback

# Schema for Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="Rental Booking API",
        default_version='v1',
        description="API documentation for the rental booking application",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="support@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('auth/', include('dj_rest_auth.urls')),
    path('api/signup/', SignUpView.as_view(), name='signup'),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/social/', include('allauth.socialaccount.urls')),
    path('auth/user/', get_user_info, name='get_user_info'),

    # Direct Google OAuth2 Redirect
    path('auth/social/google/', google_views.oauth2_login, name='google_login'),
    path('auth/social/google/callback/', google_views.oauth2_callback, name='google_callback'),
    path('auth/google/callback/', google_callback, name='google_callback'),

    # Swagger Documentation
    re_path(r'^api/docs/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^api/redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
