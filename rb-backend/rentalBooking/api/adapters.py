from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from rest_framework.authtoken.models import Token
from django.urls import reverse
from urllib.parse import urlencode

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def save_user(self, request, sociallogin, form=None):
        user = super().save_user(request, sociallogin, form)
        # Create token if missing
        token, created = Token.objects.get_or_create(user=user)
        return user

    def get_connect_redirect_url(self, request, socialaccount):
        """
        Return the URL to redirect to after successful social account connection
        """
        token = Token.objects.get(user=request.user)
        redirect_url = f"{reverse('socialaccount_connections')}?{urlencode({'token': token.key})}"
        return redirect_url

    def authentication_error(self, request, provider_id, error, exception, extra_context):
        """
        Handle authentication errors
        """
        # Optional: Add error handling
        return super().authentication_error(request, provider_id, error, exception, extra_context)