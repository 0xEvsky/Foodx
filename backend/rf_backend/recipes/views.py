from django.shortcuts import render, get_object_or_404
from .models import Recipe, Category, Tag, Ingredient
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
import json


@ensure_csrf_cookie
def get_csrf_token(request):
    from django.middleware.csrf import get_token
    token = get_token(request)
    return JsonResponse({
        'csrfToken': token,
        'detail': 'CSRF cookie set'
    }, status=200)


@csrf_exempt
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

@csrf_exempt
def recipe_by_id(request: HttpRequest, id: int):
    recipe_obj = get_object_or_404(Recipe, id=id)
    match request.method:
        case 'GET':
            recipe_json = serialize('json', [recipe_obj])
            response = HttpResponse(recipe_json, content_type='application/json')
            return response
        
        case 'PATCH':
            try:
                if not request.body:
                    return JsonResponse({'error': 'Request body is empty'}, status=400)
                
                changedFields = json.loads(request.body)
                if not isinstance(changedFields, dict):
                    return JsonResponse({'error': 'Invalid JSON format. Expected an object'}, status=400)
                
                m2m_payload = {}
                for field in changedFields:
                    if field != "id":
                        if field in ['ingredient', 'categories', 'tags']:
                            if field == 'ingredient':
                                ingredient = Ingredient.objects.get_or_create(name=changedFields[field])
                                if field in m2m_payload:
                                    m2m_payload[field].append(ingredient.pk)
                                else:
                                    m2m_payload[field] = [ingredient.pk]
                                    
                            elif field = 'categories':
                                category = Category.objects.get_or_create(name=changedFields[field])
                                m2m_payload[field] = category.pk
                                
                            else:
                                tag = Tag.objects.get_or_create(name=changedFields[field])
                                m2m_payload[field] = tag.pk

                        setattr(recipe_obj, field, changedFields[field])
                recipe_obj.save()
                if m2m_payload:
                    m2m_payload['id'] = id
                    return JsonResponse(m2m_payload, status=200)
                else:
                    return HttpResponse(status=204)
                
            except json.JSONDecodeError as e:
                return JsonResponse({
                    'error': 'Invalid JSON format',
                    'detail': str(e)
                }, status=400)
                
            except Exception as e:
                return JsonResponse({
                    'error': 'An error occurred while processing the request',
                    'detail': str(e)
                }, status=500)
            
            
        case 'DELETE':
            deleted_count, _ = recipe_obj.delete()
            
            if deleted_count:
                return JsonResponse({'message': 'Recipe deleted'}, status=204)
            else:
                return JsonResponse({'error': 'deletion failed'}, status=400)
            
            
            
def ingredients(request: HttpRequest) -> HttpResponse:
    if request.method == 'GET':
        ingredientsSet = Ingredient.objects.all()
        ingredientssData = serialize('json', ingredientsSet)
        response = HttpResponse(ingredientssData, content_type='application/json')
        return response


def categories(request: HttpRequest) -> HttpResponse:
    if request.method == 'GET':
        categories_set = Category.objects.all()
        categories_data = serialize('json', categories_set)
        response = HttpResponse(categories_data, content_type='application/json')
        return response


def tags(request: HttpRequest) -> HttpResponse:
    if request.method == 'GET':
        tags_set = Tag.objects.all()
        tags_data = serialize('json', tags_set)
        response = HttpResponse(tags_data, content_type='application/json')
        return response





