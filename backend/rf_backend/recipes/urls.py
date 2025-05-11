from django.urls import path
from . import views

urlpatterns = [
    path('recipes/', views.recipes, name='recipes'),
    path('recipes/<int:id>', views.recipe_by_id, name='recipe')
]
