from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
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
    


class CustomUser(AbstractBaseUser, PermissionsMixin):
    UID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, null=False)
    first_name = models.CharField(max_length=50)
    middle_initial = models.CharField(max_length=1, null=True, blank=True)
    last_name = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    grade_level = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, default="Teacher", blank=False, null=False, editable=True)
    profilepic = models.ImageField(upload_to="profile_pictures", default="default.png", null=True, blank=True)

    USERNAME_FIELD="email"
    REQUIRED_FIELDS=['first_name','middle_initial','last_name','subject','grade_level']

    is_staff=models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    objects = AppUserManager()

    def __str__(self) -> str:
        return f" {self.email}  UID: {self.UID}"
    
class SchoolYear(models.Model):
     year_id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=False)
     year_start = models.DateField(blank=False, null=False)
     year_end = models.DateField(blank=False, null=False)
     is_active = models.BooleanField(default=False)

     def save(self, *args, **kwargs):
        if self.is_active:
            # When saving an active year, set all others to False
            SchoolYear.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)
        
     def __str__(self) -> str:
        return f" {self.year_start} -  {self.year_end} UID: {self.year_id}"
    

class Quarter(models.Model):
     quarter_id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=False)
     school_year = models.ForeignKey(SchoolYear, on_delete=models.CASCADE, related_name="school_year")
     quarter_number = models.PositiveSmallIntegerField()
     deadline = models.DateTimeField()

     def __str__(self) -> str:
        return f" {self.school_year}, Quarter: {self.quarter_number}  UID: {self.quarter_id}"
    

class LessonPlan(models.Model):
    # STATUS_CHOICES = [
    #     ("PENDING", "Pending"),
    #     ("APPROVED", "Approved"),
    #     ("REJECTED", "Rejected")]
     plan_id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=False)
     teacher = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False, blank=False, related_name="lesson_plan")
     quarter = models.ForeignKey(Quarter, on_delete=models.CASCADE, blank=False, null=False, related_name="quarters")
     lesson_plan = models.FileField(upload_to='pdfs', blank=False, null=False)
     status = models.CharField(max_length=10, default="Pending", blank=False, null=False)
     feedback = models.TextField(blank=True, null=False)
     created_at = models.DateTimeField(auto_now_add=True)
     reviewed_at = models.DateTimeField(blank=True, null=True)
     
    #  certificate = models.FileField(upload)
     @property
     def is_late(self):
        return self.created_at > self.quarter.deadline

     def __str__(self):
          return f" {self.teacher.first_name} {self.teacher.last_name}  review_id: {self.plan_id}"
     
     
class ReviewedLessonPlan(models.Model):
     review_id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=False)
     reviewed_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="lessonPlan_reviewedBy")
     lesson_plan = models.ForeignKey(LessonPlan, on_delete=models.CASCADE, related_name="lessonPlan")
     reviewed_at = models.DateTimeField(auto_now_add=True)

     def __str__(self):
          return f" Reviewer: {self.reviewed_by.first_name} {self.reviewed_by.last_name} Reviewee: {self.lesson_plan.teacher.first_name} {self.lesson_plan.teacher.last_name} Reviewed at: {self.reviewed_at}"