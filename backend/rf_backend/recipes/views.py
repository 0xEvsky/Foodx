from django.shortcuts import render, get_object_or_404
from .models import Recipe, Category, Tag, Ingredient
from django.http import HttpRequest, HttpResponse
from django.core.serializers import serialize



def recipes(request: HttpRequest):
    if request.method == 'GET':
        recipesSet = Recipe.objects.all()
        recipesData = serialize('json', recipesSet)
        return HttpResponse(recipesData, content_type='application/json')


def recipe_by_id(request: HttpRequest, id: int):
    if request.method == 'GET':
        recipe_obj = get_object_or_404(Recipe, id=id)
        recipe_json = serialize('json', [recipe_obj])
        return HttpResponse(recipe_json, content_type='application/json')
        
            
            


