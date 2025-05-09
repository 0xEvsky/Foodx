create virtual enviroment: 
    python -m venv django

activate enviroment: 
    Scripts\activate.bat

create a project in the enviroment: 
    django-admin startproject my_tennis_club

create an app in the project:
    python manage.py startapp members

run server: 
    python manage.py runserver

migrate: 
    python manage.py migrate
    python manage.py makemigrations members