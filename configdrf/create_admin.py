import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'configdrf.settings')
django.setup()

from core.models import User

email = 'admin@admin.com'
password = 'adminpassword'

if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(email=email, password=password)
    print(f"Superuser {email} created successfully.")
else:
    user = User.objects.get(email=email)
    user.set_password(password)
    user.is_superuser = True
    user.is_staff = True
    user.save()
    print(f"Superuser {email} already exists. Password updated to {password}.")
