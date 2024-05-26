from django.urls import path
from myAPI import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('api/users/', views.userApi),
    path('api/users/<int:id>/', views.userApi),
    path('api/foods/', views.foodApi),
    path('api/foods/<int:id>/', views.foodApi),
    path('eatenfood/', views.eatenFoodApi),
    path('eatenfood/<int:id>/', views.eatenFoodApi),
    path('api/users/savefile', views.SaveFile),
    path('api/users/savefile/<int:id>/', views.SaveFile)
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)