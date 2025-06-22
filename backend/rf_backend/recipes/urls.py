from django.urls import path
from . import views

urlpatterns = [
    # API endpoints
    path('csrf/', views.get_csrf_token),
    path('recipes/', views.recipes, name='recipes_api'),
    path('recipes/<int:id>', views.recipe_by_id, name='recipe_by_id_api'),
    path('ingredients/', views.ingredients, name='ingredients'),
    path('categories/', views.categories, name='categories'),  
    path('tags/', views.tags, name='tags'),
]
