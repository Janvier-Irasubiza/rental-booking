# backend/forms.py
from django.contrib.auth.forms import AuthenticationForm
from django import forms

class AuthenticationForm(AuthenticationForm):
    username = forms.EmailField(
        label="Email",
        widget=forms.EmailInput(attrs={'autofocus': True})
    )