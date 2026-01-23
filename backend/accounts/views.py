from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, permissions
from .serializers import *
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView






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

class LessonPlan(APIView):
    permission_classes = (permissions.AllowAny,) #AllowAny is for debugging purposes only

    def post(self,request):
        data = request.data
        teacher_id = request.user.UID

        if not teacher_id:
            return Response({'error':'Teacher ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        

         


    def get(self,request):
        data = request.data
        userid = request.user.UID
        role = request.user.role

        if not userid:
            return Response({'error':'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    
        if role == "Principal" or role == "PRINCIPAL":
            lessonPlan = LessonPlan.objects.all()
            serializer = LessonPlanSerializer(lessonPlan, many = True)
            return Response(serializer.data)
        # if role == "Teacher" or role == "TEACHER":
        #     teacher = LessonPlan.objects.filter(teacher_id = userid)
        #     serializer = 

        #     return Response({'error':'Must be Principal in order to access this '})
            



        
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
