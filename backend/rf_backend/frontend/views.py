from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

# Template Views
def home_view(request):
    """Render the home page"""
    return render(request, 'index.html')

def recipes_view(request):
    """Render the recipes page"""
    return render(request, 'recipes.html')

def all_recipes_view(request):
    """Render the all recipes page"""
    return render(request, 'all-recipes.html')

def about_view(request):
    """Render the about page"""
    return render(request, 'about.html')

def contact_view(request):
    """Render the contact page"""
    return render(request, 'contact.html')

def profile_view(request):
    """Render the profile page"""
    return render(request, 'profile.html')

def login_view(request):
    """Render the login page"""
    return render(request, 'login.html')

def signup_view(request):
    """Render the signup page"""
    return render(request, 'signup.html')

def favorites_view(request):
    """Render the favorites page"""
    return render(request, 'favorites.html')

def admin_view(request):
    """Render the admin page"""
    return render(request, 'admin.html')

def add_recipe_view(request):
    """Render the add recipe page"""
    return render(request, 'add_recipe.html')

def edit_recipe_view(request):
    """Render the edit recipe page"""
    return render(request, 'edit_recipe.html')

def forgot_password_view(request):
    """Render the forgot password page"""
    return render(request, 'forgot_password.html')

def reset_password_view(request):
    """Render the reset password page"""
    return render(request, 'reset_password.html')

def allergy_popup_view(request):
    """Render the allergy popup page"""
    return render(request, 'allergy_popup.html')
