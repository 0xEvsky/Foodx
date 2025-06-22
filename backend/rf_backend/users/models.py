from django.db import models
from django.utils import timezone
from recipes.models import Recipe

class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    favorite_recipes = models.ManyToManyField(Recipe, blank=True, related_name='favorited_by')
    
    def __str__(self):
        return self.username