from .models import *
from rest_framework import serializers
from django.contrib.auth import authenticate
from djoser.serializers import UserSerializer, UserCreateSerializer
from django.contrib.auth import get_user_model

UserModel = get_user_model()

#User Serializers
class CustomUserSerializer(UserSerializer):
    class Meta:
        model = UserModel
        fields = ["UID", "first_name", "middle_initial", "last_name", "subject", "grade_level", "email", "password", "role", "profilepic"]

class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = UserModel
        fields = ["UID", "first_name", "middle_initial", "last_name", "subject", "grade_level", "email", "role", "password"]

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["first_name", "middle_initial", "last_name", "subject", "grade_level", "email", "password", "profilepic"]

class GetTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["UID", "first_name", "middle_initial", "last_name", "subject", "grade_level", "email", "role", "profilepic"]

class PostLessonPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonPlan
        fields = ["plan_id", "lesson_plan", "status", "feedback", "created_at", "quarter"]


class LessonPlanSerializer(serializers.ModelSerializer):
    teacher = GetTeacherSerializer(read_only=True)

    class Meta:
        model = LessonPlan
        fields = ["plan_id", "teacher", "lesson_plan", "status", "feedback", "created_at", "quarter"]

class UpdateLessonPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonPlan
        fields = ["status", "feedback"]

class ReviewedLessonPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewedLessonPlan
        fields = ["reviewed_by","lesson_plan"]


# class UserRegistrationSerializer(serializers.ModelSerializer):
#     password1 = serializers.CharField(write_only=True)
#     password2 = serializers.CharField(write_only=True)

#     class Meta:
#         model = UserModel
#         fields = ("id", "username", "email", "password1", "password2") 
#         extra_kwargs = {"password": {"write_only": True}}
    
#     def validate(self, attrs):
#         if attrs['password1'] != attrs['password2']:
#             raise serializers.ValidationError("Passwords do not match!")
        
#         password = attrs.get("password1", "")
#         if len(password) < 8:
#             raise serializers.ValidationError("Password must be at least 8 characters!")
#         return attrs
    

#     def create(self, validated_data):
#         password = validated_data.pop("password1")
#         validated_data.pop("password2")

#         return UserModel.objects.create_user(password=password, **validated_data)
    

# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.CharField()
#     password = serializers.CharField(write_only=True)

#     def validate(self, data):
#         user = authenticate(**data)
#         if user and user.is_active:
#             return user
#         raise serializers.ValidationError("Incorrect Credentials")