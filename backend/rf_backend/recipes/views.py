from django.shortcuts import render, get_object_or_404
from .models import Recipe, Category, Tag, Ingredient
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.core.serializers import serialize
import json


def recipes(request: HttpRequest):    
    if request.method == 'GET':
        recipesSet = Recipe.objects.all()
        recipesData = serialize('json', recipesSet)
        response = HttpResponse(recipesData, content_type='application/json')
        return response
    elif request.method == 'POST':
        try:
            data = json.loads(request.body) # data of the new recipe
            newRecipe = Recipe(
                name=data.get('name'),
                image=data.get('image'),
                description=data.get('description'),
                time=data.get('time'),
                servings=data.get('servings'),
                cuisine=data.get('cuisine'),
                badge=data.get('badge', 'new'),
                rating=data.get('rating', 0),
                ratingCount=data.get('ratingCount', 0),
                instructions=data.get('instructions')
            )
            
            newRecipe.save()
            
            # handling many to many fields
            
            categoriesData = data.get('categories')
            if categoriesData:
                for category_name in categoriesData:
                    category, _ = Category.objects.get_or_create(name=category_name)
                    newRecipe.categories.add(category)
                    
            
            tagsData = data.get('tags')
            if tagsData:
                for tag_name in tagsData:
                    tag, _ = Tag.objects.get_or_create(name=tag_name)
                    newRecipe.tags.add(tag)
            
            
            ingredientsData = data.get('ingredients')
            if ingredientsData:
                for ingredient_name in ingredientsData:
                    ingredient, _ = Ingredient.objects.get_or_create(name=ingredient_name)
                    newRecipe.ingredients.add(ingredient)
                    
            return JsonResponse({
                'id': newRecipe.pk,
                'message': 'recipe created successfully.'
                    }, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)


def recipe_by_id(request: HttpRequest, id: int):
    recipe_obj = get_object_or_404(Recipe, id=id)
    match request.method:
        case 'GET':
            recipe_json = serialize('json', [recipe_obj])
            response = HttpResponse(recipe_json, content_type='application/json')
            return response
        case 'PUT':
            pass
        case 'DELETE':
            deleted_count, _ = recipe_obj.delete()
            
            if deleted_count:
                return JsonResponse({'message': 'Recipe deleted'}, status=204)
            else:
                return JsonResponse({'error': 'deletion failed'}, status=400)
        
            
            


