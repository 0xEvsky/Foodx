from django.shortcuts import render, get_object_or_404
from .models import Recipe, Category, Tag, Ingredient
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.core.serializers import serialize


def recipes(request: HttpRequest):    
    if request.method == 'GET':
        recipesSet = Recipe.objects.all()
        recipesData = serialize('json', recipesSet)
        response = HttpResponse(recipesData, content_type='application/json')
        return response


def recipe_by_id(request: HttpRequest, id: int):
    recipe_obj = get_object_or_404(Recipe, id=id)
    match request.method:
        case 'GET':
            recipe_json = serialize('json', [recipe_obj])
            response = HttpResponse(recipe_json, content_type='application/json')
            return response
        case 'POST':
            pass
        case 'PUT':
            pass
        case 'DELETE':
            deleted_count, _ = recipe_obj.delete()
            
            if deleted_count:
                return JsonResponse({'message': 'Recipe deleted'}, status=200)
            else:
                return JsonResponse({'error': 'deletion failed'}, status=400)
        
            
            


