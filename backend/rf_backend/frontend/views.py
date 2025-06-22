from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from recipes.models import Recipe, Category, Tag, Ingredient
import json

# Template Views
def home_view(request):
    """Render the home page"""
    return render(request, 'index.html')

def recipes_view(request):
    """Render the recipes page with recipe data from database"""
    recipes = Recipe.objects.all()
    context = {
        'recipes': recipes
    }
    return render(request, 'recipes.html', context)

def all_recipes_view(request):
    """Render the all recipes page with recipe data from database"""
    recipes = Recipe.objects.all().prefetch_related('ingredients', 'categories', 'tags')
    
    # Convert recipes to a format that matches the JavaScript expectations
    recipes_data = []
    for recipe in recipes:
        # Split instructions by newlines or other delimiters
        instructions = recipe.instructions.split('\n') if recipe.instructions else []
        # Filter out empty instructions
        instructions = [inst.strip() for inst in instructions if inst.strip()]
        
        recipe_data = {
            'id': recipe.id,
            'name': recipe.name,
            'slug': recipe.name.lower().replace(' ', '-'),
            'image': recipe.image,
            'description': recipe.description,
            'time': recipe.time,
            'servings': recipe.servings,
            'cuisine': recipe.cuisine,
            'badge': recipe.badge,
            'rating': recipe.rating,
            'ratingCount': recipe.ratingCount,
            'instructions': instructions,
            'ingredients': [ing.name for ing in recipe.ingredients.all()],
            'categories': [cat.name for cat in recipe.categories.all()],
            'tags': [tag.name for tag in recipe.tags.all()],
        }
        recipes_data.append(recipe_data)
    
    context = {
        'recipes': recipes,
        'recipes_json': json.dumps(recipes_data)
    }
    return render(request, 'all-recipes.html', context)

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
    """Render the admin page with recipe data from database"""
    from users.models import User
    recipes = Recipe.objects.all()
    users = User.objects.all()
    
    context = {
        'recipes': recipes,
        'total_recipes': recipes.count(),
        'total_users': users.count(),
        'total_categories': Category.objects.count(),
        'total_ingredients': Ingredient.objects.count(),
    }
    return render(request, 'admin.html', context)

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
