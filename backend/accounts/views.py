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
from django.http import FileResponse, Http404, HttpResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework_simplejwt.views import TokenObtainPairView


class VerifyCertificateView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, code):
        lesson = get_object_or_404(LessonPlan, verification_code = code)
        print(lesson.status)
        if lesson.status != "Approved":
            return HttpResponse({"invalid":"This Certificate is no longer valid"}, status=status.HTTP_400_BAD_REQUEST)
        
        file_path = lesson.certificate.path
        print(file_path)
        try:
            return FileResponse(
                open(lesson.certificate.path, "rb"),
                as_attachment=False,
                filename=f"{lesson.teacher.last_name,}_{lesson.plan_id}.pdf"
            )
        except FileNotFoundError:
            return Http404("Certificate file not found")


class CreateTokenAPIView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        # Let SimpleJWT generate tokens first
        response = super().post(request, *args, **kwargs)

        access = response.data.get("access")
        refresh = response.data.get("refresh")

        # Create new clean response
        new_response = Response({"accessToken": access, "refreshToken":refresh})

        new_response.set_cookie(
            key="access",
            value=access,
            httponly=True,
            secure=False,  # True in production
            samesite="Lax",
        )

        new_response.set_cookie(
            key="refresh",
            value=refresh,
            httponly=True,
            secure=False, # True in production
            samesite="Lax",
        )

        return new_response

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

class CountView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        role = request.user.role
        
        if role == "Principal" or role == "PRINCIPAL":
            teacher_query = get_user_model().objects.filter(role = "Teacher").count()
            lesson_plan_query = LessonPlan.objects.count()
            
            return Response({"teacher_count":teacher_query, "lesson_plan_count":lesson_plan_query}, status=status.HTTP_200_OK)
        else:
            return Response({"error":"Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)


class SchoolYearView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        data = request.data
        role = request.user.role

        if role == "Principal" or role == "PRINCIPAL":
            serializer = SchoolYearSerializer(data=data)

            if serializer.is_valid():
                year = serializer.save()
                for i in range(1,5):
                    Quarter.objects.create(school_year = year, quarter_number=i)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error":"Only a Principal can create a school year"}, status=status.HTTP_403_FORBIDDEN)
        
    def get(self, request):
        role = request.user.role

        if role == "Principal" or role == "PRINCIPAL":
            school_year_list = SchoolYear.objects.all()
            serializer = SchoolYearSerializer(school_year_list, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"Unauthorized":"Only the Principal is allowed to view this"}, status=status.HTTP_401_UNAUTHORIZED)
        
    def patch(self, request, year_id):
        role = request.user.role
        
        if not year_id:
            return Response({'error':'Year ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        
        if role == "Principal" or role == "PRINCIPAL":
            instance = SchoolYear.objects.get(year_id = year_id)
            serializer = UpdateSchoolYearSerializer(instance, request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response({"Unauthorized":"Only the Principal is allowed to update this"}, status=status.HTTP_401_UNAUTHORIZED)

#Quarter Views
class QuarterView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self,request, year_id):
        role = request.user.role
         
        if not year_id:
            return Response({'error':'Year ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if role == "Principal" or role == "PRINCIPAL":
            year = get_object_or_404(SchoolYear, year_id=year_id)
            quarters = Quarter.objects.filter(school_year = year)
            serializer = QuarterSerializer(quarters, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response ({'Unauthorized':"Principal is the only one that can access this"}, status=status.HTTP_401_UNAUTHORIZED)

    def patch(self, request):
        data = request.data
        role = request.user.role
        updated_quarters = []

        for item in data:
            quarter_id = item.get("quarter_id")
            deadline = item.get("deadline")
            try:
                quarter = Quarter.objects.get(
                    quarter_id=quarter_id
                )
                quarter.deadline = deadline
                quarter.save()
                updated_quarters.append(quarter)
            except Quarter.DoesNotExist:
                continue

        if role == "Principal" or role == "PRINCIPAL":
            serializer = UpdateQuarterSerializer(data = data, many=True)
            if serializer.is_valid():
                
                return Response(UpdateQuarterSerializer(updated_quarters, many=True).data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"Unauthorized":"Principal is the only one that can access this!"}, status=status.HTTP_400_BAD_REQUEST)

        
        



            


#Lesson Plan Views
class LessonPlanView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        data = request.data
        teacher_id = request.user.UID
        role = request.user.role
        print(role)
        serializer = PostLessonPlanSerializer(data=data)

        if not teacher_id:
            return Response({'error':'Teacher ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if role != "Teacher" and role != "TEACHER":
            return Response({'error':'Only a Teacher can create a lesson plan'}, status=status.HTTP_403_FORBIDDEN)
        
        if serializer.is_valid():
            serializer.save(teacher = request.user)
            return Response (serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
      
    def get(self, request):
        user = request.user
        role = request.user.role

        try:
            if role == "PRINCIPAL" or role == "Principal":
           
                queryset = LessonPlan.objects.select_related(
                        "teacher",
                        "quarter",
                        "quarter__school_year"
                )

            elif role == 'Teacher' or role == 'TEACHER':
                queryset = LessonPlan.objects.select_related(
                        "teacher",
                        "quarter",
                        "quarter__school_year"
                    ).filter(teacher=user)
            
            else:
                return Response({"error":"Unauthorized"},status=status.HTTP_403_FORBIDDEN)
            
            quarter_number = request.query_params.get("quarter")
            status_param = request.query_params.get("status")
            is_late = request.query_params.get("is_late")
            school_year = request.query_params.get("school_year")

            if quarter_number:
                queryset = queryset.filter(
                    quarter__quarter_number=quarter_number
                )

            if status_param:
                queryset = queryset.filter(
                    status__iexact=status_param
                )

            if is_late is not None:
                is_late_bool = is_late.lower() == "true"
                if is_late_bool:
                    queryset = queryset.filter(
                        created_at__gt=F("quarter__deadline")
                    )
                else:
                    queryset = queryset.filter(
                        created_at__lte=F("quarter__deadline")
                    )

            if school_year:
                queryset = queryset.filter(
                    quarter__school_year__name=school_year
                )
                
            serializer = LessonPlanSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            print("ERror",e)
        
    
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
    






# class UserRegistrationAPIView(GenericAPIView):
#     permission_classes = (permissions.AllowAny,)
#     serializer_class = UserRegistrationSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         token = RefreshToken.for_user(user)
#         data = serializer.data
#         data["tokens"] = {"refresh":str(token),
#                         "access": str(token.access_token)}
#         return Response(data, status= status.HTTP_201_CREATED)
    
# class UserLoginAPIView(GenericAPIView):
#     permission_classes = (permissions.AllowAny,)
#     serializer_class = UserLoginSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data= request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data
#         serializer = CustomUserSerializer(user)
#         token = RefreshToken.for_user(user)
#         data = serializer.data
#         data["tokens"] = {"refresh":str(token),
#                         "access": str(token.access_token)}
#         return Response(data, status=status.HTTP_200_OK)
    

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
