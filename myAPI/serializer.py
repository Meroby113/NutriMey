from rest_framework import serializers
from myAPI.models import Users, Food, EatenFood

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'
    
class EatenFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = EatenFood
        fields = '__all__'