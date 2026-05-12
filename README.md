# FoodX 🍽️

A full-stack recipe discovery and management web application built with **Django** (backend) and **vanilla JavaScript** (frontend). FoodX allows users to browse, search, add, edit, and favorite recipes, with a separate admin panel for content management.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Data Models](#data-models)
- [API Reference](#api-reference)
- [Frontend Pages](#frontend-pages)
- [Authentication & Authorization](#authentication--authorization)
- [Local Storage & Caching Strategy](#local-storage--caching-strategy)
- [Getting Started](#getting-started)
- [Database Seeding](#database-seeding)
- [Known Limitations & Technical Debt](#known-limitations--technical-debt)

---

## Project Overview

FoodX is a recipe-finder platform where users can:

- Browse a curated collection of recipes with images, descriptions, ratings, and tags
- Search recipes by name or ingredient
- View full recipe detail pages with ingredients and step-by-step instructions
- Favorite recipes (requires login)
- Sign up and log in (regular users and admins)
- Recover their password via security questions

Admins additionally can:

- Add new recipes via a form
- Edit existing recipes (name, description, time, servings, cuisine, ingredients, tags, instructions)
- Delete recipes
- View aggregate statistics (total recipes, users, categories, ingredients)

The project has **two parallel implementations**: a standalone static frontend in `frontend/html/` and a Django-templated version in `backend/rf_backend/templates/`. Both consume the same Django REST API.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend Framework | Django 5.2 |
| Database | SQLite (via Django ORM) |
| Backend Language | Python 3 |
| Frontend | Vanilla JavaScript (ES Modules) |
| Templating | Django Templates (Jinja2-like syntax) |
| Styling | Custom CSS |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts (Inter, Poppins) |
| CORS | django-corsheaders |

---

## Features

### User-Facing

| Feature | Details |
|---|---|
| Recipe Grid | Responsive card grid with image, title, and short description |
| Recipe Search | Real-time filter by recipe name or ingredient |
| Recipe Detail | Full detail view: image, meta, tags, ingredients list, numbered instructions |
| Favorites | Heart icon toggle; favorites persisted to localStorage and filterable |
| Favorites Page | Dedicated page showing only the user's favorited recipes |
| Login / Sign Up | Combined page with animated panel switching |
| Admin Sign-Up | Optional admin code entry (`Admin2025#`) grants admin role |
| Password Recovery | Email lookup → security questions → password reset flow |
| Profile Page | Shows logged-in user's name and email |

### Admin-Facing

| Feature | Details |
|---|---|
| Dashboard Stats | Total recipes, users, categories, and ingredients |
| Manage Recipes | Scrollable list with Edit and Remove buttons per recipe |
| Add Recipe | Full-form with name, category, cuisine, time, servings, image, description, ingredients, instructions, nutrition, tags, and dietary flags |
| Edit Recipe | Pre-filled form; only changed fields are sent to the API via `PATCH` |
| Delete Recipe | Confirmation dialog before deletion; updates localStorage cache |

---

## Getting Started

### Prerequisites

- Python 3.10+
- pip
- A modern browser

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd project-root/backend/rf_backend

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# 3. Install dependencies
pip install django django-corsheaders

# 4. Apply migrations (this also seeds the database — see below)
python manage.py migrate

# 5. Start the development server
python manage.py runserver
```

The Django server will be available at `http://127.0.0.1:8000`.

### Accessing the App

- **Django-templated app**: `http://127.0.0.1:8000/`
- **Static frontend**: Open `frontend/html/index.html` directly in a browser, or serve with any static file server (e.g. VS Code Live Server on port 5500)
- **Admin dashboard**: Navigate to `/admin-panel/` or click "Admin Panel" in the nav after logging in as admin
- **Django built-in admin**: `http://127.0.0.1:8000/admin/`


---

## Known Limitations & Technical Debt

### Security

- **Passwords are stored in plain text.** The `User` model stores `password` as a raw `CharField`. Django's built-in `AbstractBaseUser` with `make_password`/`check_password` should be used instead.
- **All API endpoints are unprotected.** Any client can `GET`, `POST`, `PATCH`, or `DELETE` without authentication. Django REST Framework with token or session auth would address this.
- **The admin code is hardcoded in client-side JavaScript.** It is visible to anyone who reads the source. It should be validated server-side.
- **Authentication is entirely client-side.** `localStorage.isLoggedIn` can be trivially spoofed. Real sessions or JWT tokens are needed.

### Data

- **`rating` and `ratingCount` are stored as `IntegerField`**, but the seed data uses floats (e.g. `4.8`). This causes silent truncation. `FloatField` or `DecimalField` should be used.
- **`instructions` is stored as a flat `TextField`** but the seed data is a Python list. The migration casts the list to a string, resulting in values like `"['Step 1', 'Step 2']"`. The frontend strips brackets and quotes to display correctly, but this is fragile. A related `Instruction` model or a `JSONField` would be cleaner.
- **No `slug` field on the Recipe model.** Slugs are computed client-side from the recipe name. Adding a `slug` field to the model would make URL routing more robust.

### Architecture

- **Two parallel codebases.** The `frontend/html/` static files and `backend/templates/` Django templates are largely duplicated and must be kept in sync manually.
- **The static frontend has hardcoded recipe data** as a fallback inside `all-recipes.html` and `recipes.html`. This can drift from the database.
- **`tempCodeRunnerFile.js`** is a leftover debug file and should be removed.
- **No environment variables.** The Django `SECRET_KEY` is committed in `settings.py`. It should be moved to a `.env` file.
- **`DEBUG = True` in production settings.** This must be changed before any deployment.

### Features

- **The security questions flow** on the forgot-password page shows hardcoded generic questions ("What was the name of your first pet?") rather than the questions the user actually set during signup. The `User` model has no security question fields — this feature is UI-only and non-functional.
- **Favorites** are stored in `localStorage` (client-side) and also exist as a `ManyToManyField` on `User`, but the two systems are not synchronized. The localStorage favorites drive the UI; the database favorites are unused.
- **The contact form** submits to `action="#"` and does not send data anywhere.
- **Image uploads** in the add/edit recipe forms use `FileReader` to preview locally, but the image is not actually uploaded to the server. The `image` field stores only a filename string.
