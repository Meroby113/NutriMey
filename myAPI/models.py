from django.db import models

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    photoFileName = models.ImageField(upload_to='photos/', null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    height = models.FloatField(blank=True, null=True)
    #dateOfBirth = models.DateField()
    

class Food(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    calories = models.FloatField()
    protein = models.FloatField()
    fiber = models.FloatField()
    vitaminA = models.FloatField()
    vitaminB = models.FloatField()
    vitaminC = models.FloatField()
    calcium = models.FloatField()
    iodine = models.FloatField()
    magnesium = models.FloatField()
    zinc = models.FloatField()
    data = models.TextField(blank=True, null=True)
    userId = models.ForeignKey(Users, on_delete=models.CASCADE, blank=True, null=True)

class EatenFood(models.Model):
    userId = models.ForeignKey(Users, on_delete=models.CASCADE)
    foodId = models.ForeignKey(Food, on_delete=models.CASCADE)
    date = models.DateField()


