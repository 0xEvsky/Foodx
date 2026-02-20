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

## Project Structure

```
project-root/
│
├── backend/
│   └── rf_backend/
│       ├── rf_backend/              # Django project config
│       │   ├── settings.py
│       │   ├── urls.py
│       │   ├── wsgi.py
│       │   └── asgi.py
│       │
│       ├── recipes/                 # Recipes Django app
│       │   ├── models.py
│       │   ├── views.py
│       │   ├── urls.py
│       │   ├── admin.py
│       │   └── migrations/
│       │       ├── 0001_initial.py
│       │       ├── 0002_...         # M2M refactor
│       │       ├── 0003_...         # TextField upgrade
│       │       └── 0004.py          # Data seeding migration
│       │
│       ├── users/                   # Users Django app
│       │   ├── models.py
│       │   ├── views.py
│       │   ├── urls.py
│       │   ├── admin.py
│       │   └── migrations/
│       │
│       ├── frontend/                # Django app serving static templates
│       │
│       ├── templates/               # Django HTML templates
│       │   ├── index.html
│       │   ├── recipes.html
│       │   ├── all-recipes.html
│       │   ├── favorites.html
│       │   ├── about.html
│       │   ├── contact.html
│       │   ├── login.html
│       │   ├── signup.html
│       │   ├── profile.html
│       │   ├── admin.html
│       │   ├── add_recipe.html
│       │   ├── edit_recipe.html
│       │   ├── forgot_password.html
│       │   └── reset_password.html
│       │
│       └── static/                  # Static assets for Django templates
│           ├── css/
│           ├── js/
│           └── images/
│
└── frontend/                        # Standalone static frontend
    ├── html/                        # All HTML pages
    ├── css/                         # Stylesheets
    ├── js/                          # JavaScript modules
    │   ├── API_call.js              # All fetch calls to Django API
    │   ├── loadData.js              # Data loading with localStorage caching
    │   ├── common.js                # Nav auth state, smooth scroll
    │   ├── recipes.js               # Recipes listing page logic
    │   ├── favorites.js             # Favorites page logic
    │   ├── admin.js                 # Admin dashboard logic
    │   ├── add_recipe.js            # Add recipe form submission
    │   ├── edit_recipe.js           # Edit recipe form + PATCH logic
    │   ├── login.js                 # Login / signup form logic
    │   ├── signup.js                # Standalone signup page logic
    │   ├── forgot_password.js       # Password recovery flow
    │   ├── reset_password.js        # Password reset form
    │   ├── profile.js               # Profile page auth guard
    │   ├── all-recipes.js           # Recipe detail view logic
    │   ├── getCookie.js             # CSRF cookie utility
    │   └── index_script.js          # Home page scripts
    └── images/                      # Recipe images and assets
```

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

## Data Models

### `Recipe`

| Field | Type | Description |
|---|---|---|
| `id` | BigAutoField | Primary key |
| `name` | CharField(255) | Recipe name |
| `image` | CharField(255) | Image filename (served from `/static/images/`) |
| `description` | TextField | Full description |
| `time` | CharField(255) | Human-readable cooking time (e.g. "30 min") |
| `servings` | IntegerField | Number of servings |
| `cuisine` | CharField(255) | Cuisine type (e.g. "asian", "mediterranean") |
| `badge` | CharField(255) | Display badge (e.g. "New", "Trending", "Popular") |
| `rating` | IntegerField | Average rating score |
| `ratingCount` | IntegerField | Number of ratings |
| `instructions` | TextField | Cooking instructions (stored as text; may be JSON array string) |
| `categories` | ManyToManyField → Category | Meal categories (e.g. lunch, dinner, desserts) |
| `tags` | ManyToManyField → Tag | Descriptive tags (e.g. "Asian", "Vegetarian") |
| `ingredients` | ManyToManyField → Ingredient | Ingredient lookup table |

### `Category`

| Field | Type | Description |
|---|---|---|
| `id` | BigAutoField | Primary key |
| `name` | CharField(255, unique) | Category name |

### `Tag`

| Field | Type | Description |
|---|---|---|
| `id` | BigAutoField | Primary key |
| `name` | CharField(255, unique) | Tag name |

### `Ingredient`

| Field | Type | Description |
|---|---|---|
| `id` | BigAutoField | Primary key |
| `name` | CharField(255, unique) | Ingredient name |

### `User`

| Field | Type | Description |
|---|---|---|
| `id` | BigAutoField | Primary key |
| `username` | CharField(100, unique) | Display name |
| `email` | EmailField(unique) | Login email |
| `password` | CharField(100) | Password (stored in plain text — see Known Limitations) |
| `is_admin` | BooleanField | Admin flag |
| `date_joined` | DateTimeField | Auto-set on creation |
| `favorite_recipes` | ManyToManyField → Recipe | User's favorited recipes |

---

## API Reference

The base URL is `http://127.0.0.1:8000`.

### Recipes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/recipes/` | List all recipes |
| `POST` | `/recipes/` | Create a new recipe |
| `GET` | `/recipes/<id>` | Get a single recipe by ID |
| `PATCH` | `/recipes/<id>` | Update specific fields of a recipe |
| `DELETE` | `/recipes/<id>` | Delete a recipe |

**POST `/recipes/` — Request Body:**
```json
{
  "name": "Recipe Name",
  "image": "image.jpg",
  "description": "A short description.",
  "time": "30 min",
  "servings": 4,
  "cuisine": "asian",
  "badge": "New",
  "rating": 0,
  "ratingCount": 0,
  "instructions": "Step 1...\nStep 2...",
  "categories": ["lunch", "dinner"],
  "tags": ["Asian", "Seafood"],
  "ingredients": ["shrimp", "noodles", "broth"]
}
```

**PATCH `/recipes/<id>` — Request Body (only changed fields):**

For scalar fields (name, description, time, servings, cuisine, instructions):
```json
{
  "name": "New Name",
  "servings": 6
}
```

For M2M fields (ingredients, tags) — sends old/new name pairs:
```json
{
  "ingredients": [
    { "oldName": "garlic", "newName": "minced garlic" }
  ],
  "tags": [
    { "oldName": "Asian", "newName": "East Asian" }
  ]
}
```

---

### Ingredients, Tags, Categories

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/ingredients/` | List all ingredients |
| `GET` | `/tags/` | List all tags |
| `GET` | `/categories/` | List all categories |

---

### Users

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/users/` | List all users |
| `POST` | `/users/` | Create a new user |
| `GET` | `/users/<id>` | Get user by ID |
| `PUT` | `/users/<id>` | Update user fields |
| `DELETE` | `/users/<id>` | Delete user |
| `GET` | `/users/<user_id>/favorites/` | Get user's favorite recipes |
| `POST` | `/users/<user_id>/favorites/<recipe_id>/add/` | Add a recipe to favorites |
| `POST` | `/users/<user_id>/favorites/<recipe_id>/remove/` | Remove a recipe from favorites |
| `POST` | `/users/reset-password/` | Check if email exists (returns `{ exists: true/false }`) |
| `POST` | `/users/update-password/` | Update password by email |

**POST `/users/` — Request Body:**
```json
{
  "username": "JohnDoe",
  "email": "john@example.com",
  "password": "mypassword",
  "is_admin": false
}
```

**POST `/users/update-password/` — Request Body:**
```json
{
  "email": "john@example.com",
  "password": "newpassword123"
}
```

---

### CSRF

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/csrf/` | Obtain CSRF token (sets cookie + returns token in body) |

---

## Frontend Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero section, feature highlights, trending recipes |
| Recipes | `recipes.html` | Full recipe grid loaded from API with search and favorite toggle |
| Recipe Detail | `all-recipes.html` | Single-recipe detail view driven by URL hash (e.g. `#shrimp-noodle-soup`) |
| Favorites | `favorites.html` | Filtered grid of the user's favorited recipes |
| About | `about.html` | Static about page |
| Contact | `contact.html` | Contact form, FAQ, support info |
| Login / Sign Up | `login.html` | Animated dual-panel auth page |
| Forgot Password | `forgot_password.html` | Email lookup → security questions flow |
| Reset Password | `reset_password.html` | New password entry (email passed via query param) |
| Profile | `profile.html` | User name and email display |
| Admin Dashboard | `admin.html` | Stats, recent activity, manage/delete/edit recipes |
| Add Recipe | `add_recipe.html` | Full recipe creation form |
| Edit Recipe | `edit_recipe.html` | Pre-filled edit form; sends only changed fields via PATCH |

---

## Authentication & Authorization

Authentication is entirely **client-side** using `localStorage` and `sessionStorage`. There is no Django session or token-based auth protecting the API endpoints.

### Login Flow

1. On form submit, `login.js` fetches all users from the API (or localStorage cache).
2. It matches the entered email and password against the cached user list.
3. On match, it sets:
   - `localStorage.isLoggedIn = 'true'`
   - `localStorage.isAdmin = 'true' | 'false'`
   - `sessionStorage.userEmail`
   - `sessionStorage.userName`

### Sign Up Flow

1. Validates fields client-side.
2. If admin checkbox is checked, verifies the hardcoded admin code (`Admin2025#`).
3. POSTs to `/users/` to create the user in the database.
4. Pushes the new user into the localStorage `users` cache.

### Nav State (`common.js`)

`common.js` runs on every page and updates the navigation bar:
- **Not logged in**: shows Login link, hides Profile
- **Logged in (regular)**: hides Login, shows Profile and Logout
- **Logged in (admin)**: hides Login and Profile, shows Admin Panel and Logout

### Admin Code

The admin code is hardcoded in two places:
- `frontend/js/login.js` → `CORRECT_ADMIN_CODE = "Admin2025#"`
- `frontend/js/signup.js` → `adminRequiredPasscode = "Admin2025#"`

---

## Local Storage & Caching Strategy

The frontend uses `localStorage` as an API response cache to avoid redundant network calls. The caching logic lives in `frontend/js/loadData.js`.

| Key | Contents | Invalidation |
|---|---|---|
| `recipes` | Array of recipe objects | Manual (cleared on add/delete) |
| `ingredients` | Array of ingredient objects | Manual |
| `tags` | Array of tag objects | Manual |
| `categories` | Array of category objects | Manual |
| `users` | Array of user objects | Manual (updated on signup) |
| `favorites` | Array of favorited recipe names | Updated on heart toggle |
| `isLoggedIn` | `'true'` or absent | Cleared on logout |
| `isAdmin` | `'true'` or `'false'` | Cleared on logout |
| `editRecipe` | Recipe name for edit page | Set before navigating to edit |
| `editRecipeId` | Recipe ID for edit page | Set before navigating to edit |

**Cache flow:**

```
loadRecipes(array) called
  └─ localStorage.getItem("recipes") exists?
       ├─ YES → push cached data into array, return
       └─ NO  → fetch from /recipes/ API
                  └─ flatten Django serializer format ({ pk, fields }) into plain objects
                  └─ localStorage.setItem("recipes", JSON.stringify(array))
```

> ⚠️ The cache is never automatically invalidated on the server side. After adding or deleting a recipe through the admin panel, the in-memory `recipes` array is updated and re-serialized to `localStorage`, but visiting from a different browser or clearing storage will force a fresh fetch.

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

## Database Seeding

Migration `0004.py` automatically seeds the database with 7 starter recipes when you run `python manage.py migrate`. No manual step is required.

**Seeded recipes:**
1. Shrimp Noodle Soup
2. Healthy Rice Bowl
3. Cheese Cake
4. Shish Tawook
5. Macarons
6. Salmon
7. Fried Rice

Each recipe is created with its related categories, tags, and ingredients via `get_or_create` to avoid duplicates.

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
