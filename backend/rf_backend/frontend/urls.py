from django.urls import path
from . import views

urlpatterns = [
    # Main pages
    path('', views.home_view, name='home'),
    path('browse-recipes/', views.recipes_view, name='recipes'),
    path('all-recipes/', views.all_recipes_view, name='all_recipes'),
    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),
    
    # User pages
    path('my-profile/', views.profile_view, name='profile'),
    path('user-login/', views.login_view, name='login'),
    path('user-signup/', views.signup_view, name='signup'),
    path('my-favorites/', views.favorites_view, name='favorites'),
    
    # Admin pages
    path('admin-panel/', views.admin_view, name='admin'),
    path('add-recipe/', views.add_recipe_view, name='add_recipe'),
    path('edit-recipe/', views.edit_recipe_view, name='edit_recipe'),
    
    # Password reset pages
    path('forgot-password/', views.forgot_password_view, name='forgot_password'),
    path('reset-password/', views.reset_password_view, name='reset_password'),
    
    # Utility pages
    path('allergy-popup/', views.allergy_popup_view, name='allergy_popup'),
] 