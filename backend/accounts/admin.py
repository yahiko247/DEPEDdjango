from django.contrib import admin
from .models import *
from .forms import CustomUserChangeForm, CustomUserCreationForm
from django.contrib.auth.admin import UserAdmin

# Register your models here.

admin.site.register(CustomUser)
admin.site.register(LessonPlan)
admin.site.register(ReviewedLessonPlan)