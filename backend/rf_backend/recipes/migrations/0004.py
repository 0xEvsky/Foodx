from django.db import migrations


class Migration(migrations.Migration):
    
    def seed_data(apps, schema_editor):                           # apps is an object provided by django to access project apps at migration time
        Category = apps.get_model("recipes", "Category")          # get the Category model defined in recipes/models
        Tag = apps.get_model("recipes", "Tag")                    # get the Tag model defined in recipes/models
        Ingredient = apps.get_model("recipes", "Ingredient")      # get the Ingredient model defined in recipes/models
        Recipe = apps.get_model("recipes", "Recipe")              # get the Category model defined in recipes/models
        
        recipes_data = [                                          # list of recipes as objects/dictioanries to be converted to actual objects later on
            {
                "name": "Shrimp Noodle Soup",
                "image": "Shrimp Noodle Soup.jpg",
                "description": "A vibrant bowl of Vietnamese-style noodle soup with fresh shrimp and herbs.",
                "time": "30 min",
                "servings": 4,
                "categories": ["lunch", "dinner"],
                "cuisine": "asian",
                "diet": [],
                "badge": "New",
                "rating": 4.8,
                "ratingCount": 124,
                "tags": ["Asian", "Seafood"],
                "ingredients": ["broth", "soy sauce", "sesame oil", "ginger", "garlic", "noodles", "shrimp", "mushrooms", "bok choy", "green onions"],
                "instructions": [
                    "Prepare the broth with ginger and garlic.",
                    "Cook the noodles according to package directions.",
                    "Sauté shrimp and mushrooms.",
                    "Combine broth, noodles, shrimp, mushrooms, and bok choy.",
                    "Garnish with green onions and serve."
                ]
            },
            {
                "name": "Healthy Rice Bowl",
                "slug": "healthy-rice",
                "image": "Healthy Rice.jpg",
                "description": "Brown rice bowl with roasted vegetables, soft-boiled egg, and tahini dressing.",
                "time": "20 min",
                "servings": 2,
                "categories": ["lunch"],
                "cuisine": "mediterranean",
                "diet": ["vegetarian"],
                "badge": "Trending",
                "rating": 4.5,
                "ratingCount": 98,
                "tags": ["Mediterranean", "Vegetarian"],
                "ingredients": ["rice", "chickpeas", "spinach", "avocado", "tomatoes", "cucumber", "carrots", "tahini"],
                "instructions": [
                    "Cook brown rice.",
                    "Roast vegetables (chickpeas, carrots).",
                    "Prepare soft-boiled eggs.",
                    "Assemble the bowl with rice, spinach, roasted veggies, avocado, tomatoes, cucumber, and egg.",
                    "Drizzle with tahini dressing."
                ]
            },
            {
                "name": "Cheese Cake",
                "image": "Cheese Cake.jpg",
                "description": "Classic creamy cheesecake with a buttery graham cracker crust.",
                "time": "1 hr",
                "servings": 8,
                "categories": ["desserts"],
                "cuisine": "mediterranean",
                "diet": ["vegetarian"],
                "badge": "Popular",
                "rating": 4.9,
                "ratingCount": 200,
                "tags": ["Dessert", "Cheesecake"],
                "ingredients": ["graham crackers", "butter", "sugar", "cream cheese", "sour cream", "vanilla", "eggs"],
                "instructions": [
                    "Make the graham cracker crust and press into pan.",
                    "Beat cream cheese, sugar, and vanilla until smooth.",
                    "Mix in sour cream and eggs.",
                    "Pour filling over crust.",
                    "Bake until set, then chill completely."
                ]
            },
            {
                "name": "Shish Tawook",
                "image": "shishtawok.jpg",
                "description": "Grilled marinated chicken skewers served with garlic sauce.",
                "time": "40 min",
                "servings": 4,
                "categories": ["dinner"],
                "cuisine": "mediterranean",
                "diet": [],
                "badge": "Trending",
                "rating": 4.7,
                "ratingCount": 150,
                "tags": ["Mediterranean", "Chicken"],
                "ingredients": ["yogurt", "lemon", "olive oil", "garlic", "tomato paste", "paprika", "cumin", "coriander", "chicken", "onion", "bell peppers"],
                "instructions": [
                    "Marinate chicken in yogurt, lemon, and spices.",
                    "Grill chicken until cooked through.",
                    "Serve with garlic sauce."
                ]
            },
            {
                "name": "Macarons",
                "image": "Macarons.jpg",
                "description": "Delicate French cookies with a crisp shell and creamy filling.",
                "time": "1.5 hrs",
                "servings": 12,
                "categories": ["desserts", "snacks"],
                "cuisine": "mediterranean",
                "diet": ["gluten-free"],
                "badge": "New",
                "rating": 4.6,
                "ratingCount": 80,
                "tags": ["Dessert", "French"],
                "ingredients": ["almond flour", "powdered sugar", "egg whites", "cream of tartar", "butter", "vanilla"],
                "instructions": [
                    "Sift almond flour and powdered sugar.",
                    "Beat egg whites and cream of tartar until stiff peaks.",
                    "Fold in almond flour mixture.",
                    "Pipe onto baking sheet.",
                    "Bake until set, then chill."
                ]
            },
            {
                "name": "Salmon",
                "image": "Salamon.jpg",
                "description": "Oven-baked salmon fillet with lemon and herbs.",
                "time": "25 min",
                "servings": 2,
                "categories": ["lunch", "dinner"],
                "cuisine": "mediterranean",
                "diet": ["keto", "gluten-free"],
                "badge": "Popular",
                "rating": 4.8,
                "ratingCount": 110,
                "tags": ["Seafood", "Healthy"],
                "ingredients": ["salmon", "lemon", "garlic", "dill", "olive oil"],
                "instructions": [
                    "Season salmon with dill and lemon.",
                    "Bake in oven until cooked through.",
                    "Serve with lemon and herbs."
                ]
            },
            {
                "name": "Fried Rice",
                "image": "Fried Rice.jpg",
                "description": "Quick and easy fried rice with vegetables and eggs.",
                "time": "15 min",
                "servings": 3,
                "categories": ["lunch", "dinner"],
                "cuisine": "asian",
                "diet": ["vegetarian"],
                "badge": "",
                "rating": 4.3,
                "ratingCount": 90,
                "tags": ["Asian", "Vegetarian"],
                "ingredients": ["rice", "eggs", "soy sauce", "garlic", "vegetables"],
                "instructions": [
                    "Cook rice.",
                    "Sauté garlic and vegetables.",
                    "Add eggs and soy sauce.",
                    "Mix with cooked rice.",
                    "Serve."
                ]
            }
        ]

        
        for recipe in recipes_data:
            recipeEntry = Recipe.objects.create(                  # creating AND saving the actual object it to the database
                name=recipe["name"],
                image=recipe["image"],
                description=recipe["description"],
                time=recipe["time"],
                servings=recipe["servings"],
                cuisine=recipe["cuisine"],
                badge=recipe["badge"],
                rating=recipe["rating"],
                ratingCount=recipe["ratingCount"],
                instructions=recipe["instructions"],
            )
            
            
            for category_name in recipe["categories"]:                                   # creates n objects of the model Category AND save them to the Category table
                categ_entry, _ = Category.objects.get_or_create(name=category_name)
                recipeEntry.categories.add(categ_entry)                                   # A new entry for the many-to-many relationship table (recipes <-> categories)
                
            
            for tag_name in recipe["tags"]:
                tag_entry, _ = Tag.objects.get_or_create(name=tag_name) 
                recipeEntry.tags.add(tag_entry)


            for ingredient_name in recipe["ingredients"]:
                ingredient_entry, _ = Ingredient.objects.get_or_create(name=ingredient_name)
                recipeEntry.ingredients.add(ingredient_entry) 

    dependencies = [
        ('recipes', '0003_alter_recipe_description_alter_recipe_instructions'),
    ]

    operations = [
        migrations.RunPython(seed_data)
    ]
