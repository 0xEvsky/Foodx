from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpRequest, HttpResponse
from django.core.serializers import serialize
import json
from .models import User

def users(request: HttpRequest):
    if request.method == 'GET':
        users_set = User.objects.all()
        users_data = serialize('json', users_set)
        return HttpResponse(users_data, content_type='application/json')
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_user = User(
                username=data.get('username'),
                email=data.get('email'),
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
                is_admin=data.get('is_admin', False)
            )
            new_user.save()
            return JsonResponse({'status': 'success', 'id': new_user.id}, status=201)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
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
