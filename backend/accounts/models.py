from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
import uuid

class AppUserManager(BaseUserManager):
    def create_user(self, first_name, middle_initial, last_name, subject, grade_level, email, password=None):
            if not email:
                raise ValueError('An Email is Required')
            if not password:
                raise ValueError('A Password is Required')
            
            email = self.normalize_email(email)
            user = self.model(
                 first_name=first_name,
                 middle_initial = middle_initial,
                 last_name=last_name,
                 subject=subject, 
                 grade_level=grade_level, 
                 email=email)

            user.set_password(password)
            user.save()

            return user
    def create_superuser(self, first_name, middle_initial, last_name, subject, grade_level, email, password=None):
            if not email:
                raise ValueError('An email is required.')
            if not password:
                raise ValueError('A password is required.')
            
            user = self.create_user(
                 first_name=first_name,
                 middle_initial = middle_initial,
                 last_name=last_name,
                 subject=subject, 
                 grade_level=grade_level, 
                 email=email,
                 password=password)

            user.is_superuser = True
            user.is_staff = True
            user.save()

            return user

class CustomUser(AbstractUser):
    UID = models.UUIDField(primary_key=True, default=uuid.uuid8, editable=False, null=False)
    first_name = models.CharField(max_length=50)
    middle_initial = models.CharField(max_length=1, null=True, blank=True)
    last_name = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    grade_level = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=50)
    profilepic = models.ImageField(upload_to="profile_pictures", default="default.png", null=True)


    USERNAME_FIELD="email"
    REQUIRED_FIELDS=['first_name','middle_initial','last_name','subject','grade_level']

    is_staff=models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    objects = AppUserManager()

    def __str__(self) -> str:
        return self.email


class LessonPlan(models.Model):
     plan_id = models.UUIDField(primary_key=True, default=uuid.uuid8, editable=False)
     User = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False, blank=False)
     lesson_plan = models.FileField(upload_to='pdfs', blank=False, null=False)
