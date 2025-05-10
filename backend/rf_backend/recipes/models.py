from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

class Tag(models.Model):
    name = models.CharField(max_length=255, unique=True)

class Ingredient(models.Model):
    name = models.CharField(max_length=255, unique=True)

class Recipe(models.Model):
    name = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    description = models.TextField()
    time = models.CharField(max_length=255)
    servings = models.IntegerField()
    cuisine = models.CharField(max_length=255)
    badge = models.CharField(max_length=255)
    rating = models.IntegerField()
    ratingCount = models.IntegerField()
    instructions = models.TextField()
    categories = models.ManyToManyField(Category, related_name="recipes")
    tags = models.ManyToManyField(Tag, related_name="recipes")
    ingredients = models.ManyToManyField(Ingredient, related_name="recipes")