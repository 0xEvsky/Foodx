from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpRequest, HttpResponse
from django.core.serializers import serialize
import json
from .models import User
from recipes.models import Recipe
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def users(request: HttpRequest):
    if request.method == 'GET':
        users_set = User.objects.all()
        users_data = serialize('json', users_set)
        return HttpResponse(users_data, content_type='application/json', status=200)
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            # Handle both 'name' and 'username' fields
            username = data.get('username') or data.get('name')
            email = data.get('email')
            password = data.get('password')
            is_admin = data.get('is_admin', False)
            
            if not username or not email or not password:
                return JsonResponse({
                    'status': 'error', 
                    'message': 'Username, email, and password are required'
                }, status=400)
            
            # Check if user already exists
            if User.objects.filter(email=email).exists():
                return JsonResponse({
                    'status': 'error', 
                    'message': 'Email already registered'
                }, status=400)
                
            if User.objects.filter(username=username).exists():
                return JsonResponse({
                    'status': 'error', 
                    'message': 'Username already taken'
                }, status=400)
            
            new_user = User(
                username=username,
                email=email,
                password=password,
                is_admin=is_admin
            )
            new_user.save()
            return JsonResponse({
                'status': 'success', 
                'id': new_user.pk,
                'message': 'User created successfully'
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({
                'status': 'error', 
                'message': 'Invalid JSON data'
            }, status=400)
        except Exception as e:
            return JsonResponse({
                'status': 'error', 
                'message': f'Error creating user: {str(e)}'
            }, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)



def user_by_id(request: HttpRequest, id: int):
    if request.method == 'GET':
        user_obj = get_object_or_404(User, id=id)
        user_json = serialize('json', [user_obj])
        return HttpResponse(user_json, content_type='application/json')
    elif request.method == 'PUT':
        try:
            user_obj = get_object_or_404(User, id=id)
            data = json.loads(request.body)
            
            # Update user fields if they exist in the request
            if 'username' in data:
                user_obj.username = data['username']
            if 'email' in data:
                user_obj.email = data['email']
            if 'first_name' in data:
                user_obj.first_name = data['first_name']
            if 'last_name' in data:
                user_obj.last_name = data['last_name']
            if 'is_admin' in data:
                user_obj.is_admin = data['is_admin']
                
            user_obj.save()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    elif request.method == 'DELETE':
        try:
            user_obj = get_object_or_404(User, id=id)
            user_obj.delete()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)



def add_favorite_recipe(request, user_id, recipe_id):
    if request.method == 'POST':
        user = get_object_or_404(User, id=user_id)
        recipe = get_object_or_404(Recipe, id=recipe_id)
        user.favorite_recipes.add(recipe)
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)



def remove_favorite_recipe(request, user_id, recipe_id):
    if request.method == 'POST':
        user = get_object_or_404(User, id=user_id)
        recipe = get_object_or_404(Recipe, id=recipe_id)
        user.favorite_recipes.remove(recipe)
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)



def get_favorite_recipes(request, user_id):
    if request.method == 'GET':
        user = get_object_or_404(User, id=user_id)
        favorite_recipes = user.favorite_recipes.all()
        recipes_data = serialize('json', favorite_recipes)
        return HttpResponse(recipes_data, content_type='application/json')
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)


@csrf_exempt
def reset_password(request: HttpRequest):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')

            try:
                user = User.objects.get(email=email)
                return JsonResponse({'status': 'success', 'exists': True, 'message': 'Email found'}, status=200)
            except User.DoesNotExist:
                return JsonResponse({'status': 'success', 'exists': False, 'message': 'Email not found'}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)


@csrf_exempt
def update_password(request: HttpRequest):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            new_password = data.get('password')
            
            try:
                user = User.objects.get(email=email)
                user.password = new_password
                user.save()
                return JsonResponse({'status': 'success', 'message': 'Password updated successfully'}, status=200)
            except User.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)