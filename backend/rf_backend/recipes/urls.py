from django.urls import path
from . import views

urlpatterns = [
    path('recipes/', views.recipes, name='recipes'),
    path('recipes/<int:id>', views.recipe_by_id, name='recipe'),
    path('ingredients/', views.ingredients, name='ingredients'),
    path('categories/', views.categories, name='categories'),  
    path('tags/', views.tags, name='tags'),                    
]
