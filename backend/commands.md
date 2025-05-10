create virtual enviroment: 
    python -m venv env

activate enviroment: 
    Scripts\activate.bat

create a project in the enviroment: 
    django-admin startproject rf_backend

create an app in the project:
    python manage.py startapp <app-name>

run server: 
    python manage.py runserver

migrate: 
    python manage.py migrate
    python manage.py makemigrations <app-name>