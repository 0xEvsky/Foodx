from django.shortcuts import render
from .models import Recipe, Category, Tag, Ingredient
from django.http import HttpRequest, HttpResponse
from django.core import serializers
import json


def recipes(request: HttpRequest):
    if request.method == 'GET':
        def getRecipes():
            recipesSet = Recipe.objects.all()
            recipesData = serializers.serialize('json', recipesSet)
            return HttpResponse(recipesData, content_type='application/json')
        return getRecipes()


