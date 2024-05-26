from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from myAPI.models import Users, Food, EatenFood
from myAPI.serializer import UsersSerializer, FoodSerializer, EatenFoodSerializer
from django.core.files.storage import default_storage
from django.contrib.auth import authenticate
from django.http import HttpResponseRedirect
from django.contrib.auth import login
import requests
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from myAPI.serializer import UsersSerializer
from .serializer import UsersSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.parsers import MultiPartParser, FormParser

@csrf_exempt
def userApi(request, id=0):
    parser_classes = (MultiPartParser, FormParser)
    if request.method == 'GET':
        if id > 0:
            try:
                user = Users.objects.get(id=id)
                user_serializer = UsersSerializer(user)
                return JsonResponse(user_serializer.data, safe=False)
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)
        else:
            users = Users.objects.all()
            users_serializer = UsersSerializer(users, many=True)
            return JsonResponse(users_serializer.data, safe=False)
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        users_serializer = UsersSerializer(data=user_data)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse({'success': True, 'message': 'Added Successfully!!'}, safe=False)  
        return JsonResponse({'success': False, 'error': users_serializer.errors}, status=400)  

    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        
        try:
            user = Users.objects.get(id=id)
            users_serializer = UsersSerializer(user, data=user_data)
            if users_serializer.is_valid():
                users_serializer.save()
                return JsonResponse("Updated Successfully!!", safe=False)
            return JsonResponse({'success': False, 'error': users_serializer.errors}, status=400)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    elif request.method == 'PATCH':
        user_data = JSONParser().parse(request)
        try:
            user = Users.objects.get(id=id)
            users_serializer = UsersSerializer(user, data=user_data, partial=True)
            if users_serializer.is_valid():
                users_serializer.save()
                return JsonResponse("Updated Successfully!!", safe=False)
            return JsonResponse({'success': False, 'error': users_serializer.errors}, status=400)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    elif request.method == 'DELETE':
        user = Users.objects.get(id=id)
        user.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)
    
@csrf_exempt
def foodApi(request, id=0):
    if request.method == 'GET':
        food = Food.objects.all()
        food_serializer = FoodSerializer(food, many=True)
        return JsonResponse(food_serializer.data, safe=False)
    elif request.method == 'POST':
        food_data = JSONParser().parse(request)
        food_serializer = FoodSerializer(data=food_data)
        if food_serializer.is_valid():
            food_serializer.save()
            return JsonResponse({"success": "Added Successfully!!"}, safe=False)
        return JsonResponse({"error": food_serializer.errors}, status=400)
    elif request.method == 'PUT':
        food_data = JSONParser().parse(request)
        food = Food.objects.get(foodId=food_data['foodId'])
        food_serializer = FoodSerializer(food, data=food_data)
        if food_serializer.is_valid():
            food_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method == 'DELETE':
        food = Food.objects.get(id=id)
        food.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)

@csrf_exempt
def eatenFoodApi(request, id=0):
    if request.method == 'GET':
        eatenFood = EatenFood.objects.all()
        eatenFood_serializer = EatenFoodSerializer(eatenFood, many=True)
        return JsonResponse(eatenFood_serializer.data, safe=False)
    elif request.method == 'POST':
        eatenFood_data = JSONParser().parse(request)
        eatenFood_serializer = EatenFoodSerializer(data=eatenFood_data)
        if eatenFood_serializer.is_valid():
            eatenFood_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse({"error": eatenFood_serializer.errors}, status=400)
    elif request.method == 'PUT':
        eatenFood_data = JSONParser().parse(request)
        eatenFood = EatenFood.objects.get(eatenFoodId=eatenFood_data['eatenFoodId'])
        eatenFood_serializer = EatenFoodSerializer(eatenFood, data=eatenFood_data)
        if eatenFood_serializer.is_valid():
            eatenFood_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method == 'DELETE':
        eatenFood = EatenFood.objects.get(eatenFoodId=id)
        eatenFood.delete()
        return JsonResponse("Deleted Successfully!!", safe=False)
    
@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)


