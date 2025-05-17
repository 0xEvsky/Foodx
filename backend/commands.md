# create virtual enviroment: 
    python -m venv env

# activate enviroment: 
    Scripts\activate.bat


# Install dependencies:
    -- cd -> repo/backend -- first
    pip install -r requirements.txt


# generate local dependencies:
    pip freeze > requirements.txt


# create a project in the enviroment: 
    django-admin startproject rf_backend


# create an app in the project:
    python manage.py startapp <app-name>


# run server: 
    python manage.py runserver


# migrate: 
    python manage.py migrate
    python manage.py makemigrations <app-name>


# fake rollback migration:
    python manage.py migrate recipes <prev migration number> --fake