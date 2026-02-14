from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('djoser/',include('djoser.urls')),
    path('auth/',include('djoser.urls.jwt')),
    path("logout/", views.UserLogoutAPIView.as_view(), name="logout-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("lessonplan/",views.LessonPlanView.as_view(),name="lesson-plan"),
    path("reviewlessonplan/<uuid:plan_id>/",views.LessonPlanView.as_view(),name="review-lesson-plan"),
    path("user/", views.UserInfoAPIView.as_view(), name="current-user"),
    # path('auth/jwt/create/',views.CreateTokenAPIView.as_view(), name="login-user"), for cookie tokens
    # path("register/", views.UserRegistrationAPIView.as_view(), name="register-user"),
    # path("login/", views.UserLoginAPIView.as_view(), name="login-user"),
]