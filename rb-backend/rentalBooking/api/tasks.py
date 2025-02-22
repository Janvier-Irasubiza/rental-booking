from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_password_reset_email(user_email, token):
    reset_link = f"http://localhost:3000/reset-password/{token}"
    subject = "Password Reset Request"
    message = f"Click the link below to reset your password:\n{reset_link}"
    send_mail(subject, message, "noreply@yourdomain.com", [user_email])
