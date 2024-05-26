from django.urls import path
from myApp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.home, name='home'),
    path('login/',  views.login, name='login'),
    path('register/', views.register, name='register'),
    path('userPage/', views.userPage, name='userPage'),
    path('userForm/<int:user_id>/', views.userForm, name='userForm'),
    path('contact/', views.contact, name='contact'),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)