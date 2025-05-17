from django.urls import path
from . import views

urlpatterns = [
    path('', views.users, name='users'),
    path('<int:id>', views.user_by_id, name='user_by_id'),
    path('<int:user_id>/favorites/', get_favorite_recipes, name='get_favorite_recipes'),
    path('<int:user_id>/favorites/<int:recipe_id>/add/', add_favorite_recipe, name='add_favorite_recipe'),
    path('<int:user_id>/favorites/<int:recipe_id>/remove/', remove_favorite_recipe, name='remove_favorite_recipe'),
]