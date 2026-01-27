from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.generics import GenericAPIView,  RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from typing import Any
from django.shortcuts import get_object_or_404
from django.utils import timezone


class UserLogoutAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status= status.HTTP_400_BAD_REQUEST)
        
#Lesson Plan Views


class LessonPlanView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        teacher_id = request.user.UID
        serializer = LessonPlanSerializer(data=data)

        if not teacher_id:
            return Response({'error':'Teacher ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request):
        user = request.user
        role = request.user.role
        if role == "PRINCIPAL" or role == "Principal":
            queryset = LessonPlan.objects.all()

        elif role == 'Teacher' or role == 'TEACHER':
            queryset = LessonPlan.objects.filter(teacher = user)

        else:
            return Response({"error":"Unauthorized"},status=status.HTTP_403_FORBIDDEN)
        
        serializer = LessonPlanSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch (self,request,plan_id):
        data = request.data
        user_id = request.user.UID

        user  = CustomUser.objects.get(UID = user_id)
        lesson_plan = get_object_or_404(LessonPlan, plan_id = plan_id)
        serializer = UpdateLessonPlanSerializer(lesson_plan, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            
            lesson_plan.reviewed_at = timezone.now()
            lesson_plan.save(update_fields=["reviewed_at"])

            ReviewedLessonPlan.objects.create(
                reviewed_by = user,
                lesson_plan = lesson_plan,
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({serializer.errors},status=status.HTTP_400_BAD_REQUEST)

    



class ReviewedByLessonPlan(APIView):
    def post(self, request):
        data = request.data
        user_id = request.user.UID
        plan_id = self.get_object()
        serializer = UpdateLessonPlanSerializer(plan_id,data = data)

        if serializer.is_valid():
            serializer.save()
            reviewed = LessonPlan.objects.create(
                reviewed_by = user_id,
                lesson_plan = plan_id
            )
            return Response({'success':'Updated Lesson Plan Successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh":str(token),
                        "access": str(token.access_token)}
        return Response(data, status= status.HTTP_201_CREATED)
    
class UserLoginAPIView(GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = CustomUserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh":str(token),
                        "access": str(token.access_token)}
        return Response(data, status=status.HTTP_200_OK)
    

class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status= status.HTTP_400_BAD_REQUEST)

class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer
    
    def get_object(self):
        return self.request.user
