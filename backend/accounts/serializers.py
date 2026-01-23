from .models import LessonPlan
from rest_framework import serializers
from django.contrib.auth import authenticate
from djoser.serializers import UserSerializer, UserCreateSerializer
from django.contrib.auth import get_user_model

UserModel = get_user_model()

#User Serializers
class CustomUserSerializer(UserSerializer):
    class Meta:
        model = UserModel
        fields = ["UID", "first_name", "middle_initial", "last_name", "subject", "grade_level", "email", "password", "profilepic"]

class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = UserModel
        fields = ["UID", "first_name", "middle_initial", "last_name", "subject", "grade_level", "email", "password"]

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["first_name", "middle_initial", "last_name", "subject", "grade_level", "email", "password", "profilepic"]




class LessonPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonPlan
        fields = ["plan_id", "teacher_id", "lesson_plan", "status", "feedback", "reviewed_by", "created_at", "reviewed_at"]

class UpdateLessonPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonPlan
        fields = ["teacher_id", "lesson_plan", "status", "feedback", "reviewed_by", "created_at", "reviewed_at"]





# class UserRegistrationSerializer(serializers.ModelSerializer):
#     password1 = serializers.CharField(write_only=True)
#     password2 = serializers.CharField(write_only=True)

#     class Meta:
#         model = CustomUser
#         fields = ("id", "username", "email", "password1", "password2") 
#         extra_kwargs = {"password": {"write_only": True}}
    
#     def validate(self, attrs):
#         if attrs['password1'] != attrs['password2']:
#             raise serializers.ValidationError("Passwords do not match!")
        
#         password = attrs.get("password1", "")
#         if len(password) < 8:
#             raise serializers.ValidationsError("Password must be at least 8 characters!")
#         return attrs
    

#     def create(self, validated_data):
#         password = validated_data.pop("password1")
#         validated_data.pop("password2")

#         return CustomUser.objects.create_user(password=password, **validated_data)
    

# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.CharField()
#     password = serializers.CharField(write_only=True)

#     def validat(self, data):
#         user = authenticate(**data)
#         if user and user.is_active:
#             return user
#         raise serializers.ValidationErro("Incorrect Credentials")