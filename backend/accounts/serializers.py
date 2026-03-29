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
        fields = ["UID", "first_name", "middle_initial", "last_name", "subject", "grade_level", "email", "password"]

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["first_name", "middle_initial", "last_name", "subject", "grade_level", "email", "password", "profilepic"]

class GetTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["UID", "first_name", "middle_initial", "last_name", "subject", "grade_level", "email", "role", "profilepic"]

class SchoolYearSerializer(serializers.ModelSerializer):
    school_year = serializers.SerializerMethodField()
    
    class Meta:
        model = SchoolYear
        fields = ["year_id", "year_start", "year_end", "school_year", "is_active"]

    def get_school_year(self,obj):
        return f"{obj.year_start.year}-{obj.year_end.year}"
    
    def validate(self, data):
        if data["year_end"] < data["year_start"]:
            raise serializers.ValidationError(
                "End date cannot be earlier than start date"
            )
        return data
    
class UpdateSchoolYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolYear
        fields = ["year_start", "year_end", "is_active"]

class PostLessonPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonPlan
        fields = ["plan_id", "lesson_plan", "status", "feedback", "created_at", "quarter"]

class LessonPlanSerializer(serializers.ModelSerializer):
    teacher = GetTeacherSerializer(read_only=True)
    year_id = serializers.UUIDField(source="quarter.school_year.year_id", read_only=True)
    school_year = serializers.CharField(source="quarter.school_year.name", read_only=True)
    quarter_id = serializers.UUIDField(source="quarter.quarter_id", read_only=True)
    quarter = serializers.IntegerField( source="quarter.quarter_number", read_only=True)
    deadline = serializers.DateField(source="quarter.deadline",read_only=True)
    is_late = serializers.ReadOnlyField()


    class Meta:
        model = LessonPlan
        fields = ["plan_id", "teacher","year_id", "school_year", "quarter_id", "quarter","lesson_plan", "status", "feedback", "created_at", "deadline", "qr_code","is_late"]

class UpdateLessonPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonPlan
        fields = ["status", "feedback"]

class ReviewedLessonPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewedLessonPlan
        fields = ["reviewed_by","lesson_plan"]


class QuarterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quarter
        fields = ["quarter_id", "school_year", "quarter_number", "deadline"]

class UpdateQuarterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quarter
        fields = ["quarter_id", "deadline"]


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