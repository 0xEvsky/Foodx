from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.users, name='users'),
    path('users/<int:id>', views.user_by_id, name='user_by_id'),
    path('users/<int:user_id>/favorites/', views.get_favorite_recipes, name='get_favorite_recipes'),
    path('users/<int:user_id>/favorites/<int:recipe_id>/add/', views.add_favorite_recipe, name='add_favorite_recipe'),
    path('users/<int:user_id>/favorites/<int:recipe_id>/remove/', views.remove_favorite_recipe, name='remove_favorite_recipe'),
]