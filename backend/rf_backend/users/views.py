from django.shortcuts import render, get_object_or_404
from .models import User
from django.http import HttpRequest, HttpResponse
from django.core.serializers import serialize

def users(request: HttpRequest):    
    if request.method == 'GET':
        usersSet = User.objects.all()
        usersData = serialize('json', usersSet)
        response = HttpResponse(usersData, content_type='application/json')
        return response

def user_by_id(request: HttpRequest, id: int):
    match request.method:
        case 'GET':
            user_obj = get_object_or_404(User, id=id)
            user_json = serialize('json', [user_obj])
            response = HttpResponse(user_json, content_type='application/json')
            return response
        case 'POST':
            pass
        case 'PUT':
            pass
        case 'DELETE':
            pass
