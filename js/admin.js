const recipes = [
    {
      name: "Shrimp Noodle Soup",
      image: "Shrimp Noodle Soup.jpg",
      description: "A vibrant bowl of Vietnamese-style noodle soup with fresh shrimp and herbs.",
      time: "30 min",
      servings: 4,
      categories: ["lunch", "dinner"],
      cuisine: "asian",
      diet: [],
      badge: "New",
      rating: 4.8,
      ratingCount: 124,
      tags: ["Asian", "Seafood"],
      ingredients: ["broth", "soy sauce", "sesame oil", "ginger", "garlic", "noodles", "shrimp", "mushrooms", "bok choy", "green onions"],
      instructions: [
        "Prepare the broth with ginger and garlic.",
        "Cook the noodles according to package directions.",
        "Sauté shrimp and mushrooms.",
        "Combine broth, noodles, shrimp, mushrooms, and bok choy.",
        "Garnish with green onions and serve."
      ]
    },
    {
      name: "Healthy Rice Bowl",
      slug: "healthy-rice",
      image: "Healthy Rice.jpg",
      description: "Brown rice bowl with roasted vegetables, soft-boiled egg, and tahini dressing.",
      time: "20 min",
      servings: 2,
      categories: ["lunch"],
      cuisine: "mediterranean",
      diet: ["vegetarian"],
      badge: "Trending",
      rating: 4.5,
      ratingCount: 98,
      tags: ["Mediterranean", "Vegetarian"],
      ingredients: ["rice", "chickpeas", "spinach", "avocado", "tomatoes", "cucumber", "carrots", "tahini"],
      instructions: [
        "Cook brown rice.",
        "Roast vegetables (chickpeas, carrots).",
        "Prepare soft-boiled eggs.",
        "Assemble the bowl with rice, spinach, roasted veggies, avocado, tomatoes, cucumber, and egg.",
        "Drizzle with tahini dressing."
      ]
    },
    {
      name: "Cheese Cake",
      image: "Cheese Cake.jpg",
      description: "Classic creamy cheesecake with a buttery graham cracker crust.",
      time: "1 hr",
      servings: 8,
      categories: ["desserts"],
      cuisine: "mediterranean",
      diet: ["vegetarian"],
      badge: "Popular",
      rating: 4.9,
      ratingCount: 200,
      tags: ["Dessert", "Cheesecake"],
      ingredients: ["graham crackers", "butter", "sugar", "cream cheese", "sour cream", "vanilla", "eggs"],
      instructions: [
        "Make the graham cracker crust and press into pan.",
        "Beat cream cheese, sugar, and vanilla until smooth.",
        "Mix in sour cream and eggs.",
        "Pour filling over crust.",
        "Bake until set, then chill completely."
      ]
    },
    {
      name: "Shish Tawook",
      image: "shishtawok.jpg",
      description: "Grilled marinated chicken skewers served with garlic sauce.",
      time: "40 min",
      servings: 4,
      categories: ["dinner"],
      cuisine: "mediterranean",
      diet: [],
      badge: "Trending",
      rating: 4.7,
      ratingCount: 150,
      tags: ["Mediterranean", "Chicken"],
      ingredients: ["yogurt", "lemon", "olive oil", "garlic", "tomato paste", "paprika", "cumin", "coriander", "chicken", "onion", "bell peppers"],
      instructions: [
        "Marinate chicken in yogurt, lemon, and spices.",
        "Grill chicken until cooked through.",
        "Serve with garlic sauce."
      ]
    },
    {
      name: "Macarons",
      image: "Macarons.jpg",
      description: "Delicate French cookies with a crisp shell and creamy filling.",
      time: "1.5 hrs",
      servings: 12,
      categories: ["desserts", "snacks"],
      cuisine: "mediterranean",
      diet: ["gluten-free"],
      badge: "New",
      rating: 4.6,
      ratingCount: 80,
      tags: ["Dessert", "French"],
      ingredients: ["almond flour", "powdered sugar", "egg whites", "cream of tartar", "butter", "vanilla"],
      instructions: [
        "Sift almond flour and powdered sugar.",
        "Beat egg whites and cream of tartar until stiff peaks.",
        "Fold in almond flour mixture.",
        "Pipe onto baking sheet.",
        "Bake until set, then chill."
      ]
    },
    {
      name: "Salmon",
      image: "Salamon.jpg",
      description: "Oven-baked salmon fillet with lemon and herbs.",
      time: "25 min",
      servings: 2,
      categories: ["lunch", "dinner"],
      cuisine: "mediterranean",
      diet: ["keto", "gluten-free"],
      badge: "Popular",
      rating: 4.8,
      ratingCount: 110,
      tags: ["Seafood", "Healthy"],
      ingredients: ["salmon", "lemon", "garlic", "dill", "olive oil"],
      instructions: [
        "Season salmon with dill and lemon.",
        "Bake in oven until cooked through.",
        "Serve with lemon and herbs."
      ]
    },
    {
      name: "Fried Rice",
      image: "Fried Rice.jpg",
      description: "Quick and easy fried rice with vegetables and eggs.",
      time: "15 min",
      servings: 3,
      categories: ["lunch", "dinner"],
      cuisine: "asian",
      diet: ["vegetarian"],
      badge: "",
      rating: 4.3,
      ratingCount: 90,
      tags: ["Asian", "Vegetarian"],
      ingredients: ["rice", "eggs", "soy sauce", "garlic", "vegetables"],
      instructions: [
        "Cook rice.",
        "Sauté garlic and vegetables.",
        "Add eggs and soy sauce.",
        "Mix with cooked rice.",
        "Serve."
      ]
    },
    {
      name: "Chicken Wings",
      image: "Chicken Wings.jpg",
      description: "Crispy baked chicken wings tossed in a spicy buffalo sauce.",
      time: "50 min",
      servings: 4,
      categories: ["snacks", "dinner"],
      cuisine: "mediterranean",
      diet: [],
      badge: "Trending",
      rating: 4.6,
      ratingCount: 140,
      tags: ["Snacks", "Chicken"],
      ingredients: ["chicken wings", "baking powder", "garlic powder", "salt", "pepper"],
      instructions: [
        "Season chicken wings with baking powder, garlic powder, salt, and pepper.",
        "Bake until crispy.",
        "Serve with buffalo sauce."
      ]
    },
    {
      name: "Chocolate Cake",
      image: "Chocolate Cake.jpg",
      description: "Moist chocolate cake layered with rich chocolate frosting.",
      time: "1 hr",
      servings: 8,
      categories: ["desserts"],
      cuisine: "mediterranean",
      diet: ["vegetarian"],
      badge: "",
      rating: 4.9,
      ratingCount: 220,
      tags: ["Dessert", "Chocolate"],
      ingredients: ["flour", "sugar", "cocoa powder", "baking soda", "vanilla", "vinegar"],
      instructions: [
        "Preheat oven to 350°F (175°C).",
        "Mix flour, sugar, cocoa powder, baking soda, and vinegar.",
        "Add eggs and vanilla.",
        "Bake until set, then cool.",
        "Frost and serve."
      ]
    },
    {
      name: "Green Salad",
      image: "Green Salad.jpg",
      description: "Fresh greens tossed with a light vinaigrette.",
      time: "10 min",
      servings: 2,
      categories: ["lunch"],
      cuisine: "mediterranean",
      diet: ["vegetarian", "gluten-free"],
      badge: "",
      rating: 4.4,
      ratingCount: 60,
      tags: ["Healthy", "Vegetarian"],
      ingredients: ["lettuce", "tomatoes", "cucumber", "avocado", "onion", "feta cheese"],
      instructions: [
        "Wash and dry greens.",
        "Toss with vinaigrette.",
        "Add tomatoes, cucumber, avocado, and feta cheese."
      ]
    },
    {
      name: "Ramen",
      image: "noodle.jpg",
      description: "Japanese noodle soup with pork broth and toppings.",
      time: "45 min",
      servings: 2,
      categories: ["dinner"],
      cuisine: "asian",
      diet: [],
      badge: "New",
      rating: 4.7,
      ratingCount: 130,
      tags: ["Asian", "Soup"],
      ingredients: ["pork bones", "chicken", "noodles", "soy sauce", "garlic", "ginger"],
      instructions: [
        "Boil pork bones and chicken for broth.",
        "Cook noodles according to package directions.",
        "Add soy sauce, garlic, and ginger to broth.",
        "Add noodles and chicken.",
        "Serve with toppings."
      ]
    },
    {
      name: "Caesar Salad",
      image: "Sezar Salad.jpg",
      description: "Classic Caesar salad with romaine, croutons, and parmesan.",
      time: "15 min",
      servings: 2,
      categories: ["lunch"],
      cuisine: "mediterranean",
      diet: ["vegetarian"],
      badge: "",
      rating: 4.5,
      ratingCount: 70,
      tags: ["Salad", "Vegetarian"],
      ingredients: ["romaine", "parmesan", "croutons", "anchovies", "garlic", "mustard"],
      instructions: [
        "Toss romaine with anchovies, garlic, and parmesan.",
        "Add croutons and anchovies.",
        "Dress with Caesar dressing."
      ]
    },
    {
      name: "Burrito",
      image: "Burrito.jpg",
      description: "Hearty tortilla wrap filled with beans, rice, and meat.",
      time: "25 min",
      servings: 1,
      categories: ["lunch", "dinner"],
      cuisine: "mexican",
      diet: [],
      badge: "",
      rating: 4.6,
      ratingCount: 100,
      tags: ["Mexican", "Wrap"],
      ingredients: ["beef", "beans", "rice", "tortillas", "cheese"],
      instructions: [
        "Cook beef and beans.",
        "Cook rice.",
        "Assemble burrito with beef, beans, rice, and cheese.",
        "Roll up and serve."
      ]
    },
    {
      name: "Steak",
      image: "Steak.jpg",
      description: "Grilled beef steak seasoned to perfection.",
      time: "30 min",
      servings: 2,
      categories: ["dinner"],
      cuisine: "mediterranean",
      diet: ["keto"],
      badge: "",
      rating: 4.8,
      ratingCount: 90,
      tags: ["Beef", "Grilled"],
      ingredients: ["steak", "garlic", "rosemary", "thyme", "butter"],
      instructions: [
        "Season steak with garlic, rosemary, thyme, and salt.",
        "Grill steak to desired doneness.",
        "Melt butter and baste steak.",
        "Serve with garlic butter."
      ]
    },
    {
      name: "Red Sauce Pasta",
      image: "Red Sauce Pasta.jpg",
      description: "Pasta tossed in tangy tomato sauce with herbs.",
      time: "20 min",
      servings: 2,
      categories: ["lunch", "dinner"],
      cuisine: "italian",
      diet: ["vegetarian"],
      badge: "",
      rating: 4.5,
      ratingCount: 80,
      tags: ["Italian", "Pasta"],
      ingredients: ["pasta", "tomatoes", "garlic", "basil"],
      instructions: [
        "Cook pasta.",
        "Sauté garlic and tomatoes.",
        "Add basil to pasta.",
        "Serve with tomato sauce."
      ]
    },
    {
      name: "Fettuccine",
      image: "Fettuccine.jpg",
      description: "Creamy fettuccine Alfredo with parmesan cheese.",
      time: "25 min",
      servings: 2,
      categories: ["dinner"],
      cuisine: "italian",
      diet: ["vegetarian"],
      badge: "",
      rating: 4.7,
      ratingCount: 110,
      tags: ["Italian", "Pasta"],
      ingredients: ["pasta", "cream", "parmesan", "butter"],
      instructions: [
        "Cook pasta.",
        "Melt butter and add parmesan.",
        "Mix with pasta and cream."
      ]
    },
    {
      name: "Spaghetti",
      image: "Spaghetti.jpg",
      description: "Spaghetti with rich marinara sauce and meatballs.",
      time: "30 min",
      servings: 3,
      categories: ["dinner"],
      cuisine: "italian",
      diet: [],
      badge: "",
      rating: 4.6,
      ratingCount: 120,
      tags: ["Italian", "Pasta"],
      ingredients: ["pasta", "marinara sauce", "meatballs"],
      instructions: [
        "Cook pasta.",
        "Cook meatballs.",
        "Add marinara sauce to pasta and meatballs."
      ]
    },
    {
      name: "Shrimp Pasta",
      image: "Shrimp Pasta.jpg",
      description: "Garlic butter shrimp tossed in linguine pasta.",
      time: "35 min",
      servings: 2,
      categories: ["dinner"],
      cuisine: "italian",
      diet: [],
      badge: "",
      rating: 4.8,
      ratingCount: 140,
      tags: ["Seafood", "Pasta"],
      ingredients: ["shrimp", "pasta", "garlic", "butter"],
      instructions: [
        "Cook pasta.",
        "Sauté shrimp and garlic.",
        "Add shrimp to pasta and butter."
      ]
    },
    {
      name: "Cherry Tomato Pasta",
      image: "Cherry Tomato Pasta.jpg",
      description: "Fresh cherry tomatoes with spaghetti and basil.",
      time: "20 min",
      servings: 2,
      categories: ["lunch", "dinner"],
      cuisine: "italian",
      diet: ["vegetarian"],
      badge: "",
      rating: 4.5,
      ratingCount: 70,
      tags: ["Vegetarian", "Pasta"],
      ingredients: ["pasta", "cherry tomatoes", "basil"],
      instructions: [
        "Cook pasta.",
        "Add cherry tomatoes and basil to pasta."
      ]
    },
    {
      name: "Truffle Parmesan Pasta",
      image: "Truffle Parmesan Pasta.jpg",
      description: "Creamy truffle pasta with parmesan and mushrooms.",
      time: "25 min",
      servings: 2,
      categories: ["dinner"],
      cuisine: "italian",
      diet: ["vegetarian"],
      badge: "",
      rating: 4.7,
      ratingCount: 90,
      tags: ["Italian", "Truffle"],
      ingredients: ["pasta", "truffle", "parmesan", "mushrooms"],
      instructions: [
        "Cook pasta.",
        "Add truffle oil to pasta.",
        "Add parmesan and mushrooms."
      ]
    },
    {
      name: "Burger",
      image: "Burger.jpg",
      description: "Juicy beef burger with cheese, lettuce, and tomato.",
      time: "30 min",
      servings: 1,
      categories: ["lunch", "dinner"],
      cuisine: "american",
      diet: [],
      badge: "",
      rating: 4.6,
      ratingCount: 150,
      tags: ["American", "Fast Food"],
      ingredients: ["beef", "cheese", "lettuce", "tomato"],
      instructions: [
        "Form beef patty.",
        "Grill or pan-fry patty to desired doneness.",
        "Melt cheese on patty during last minute of cooking.",
        "Toast burger bun.",
        "Assemble burger with patty, lettuce, and tomato."
      ]
    },
    {
      name: "Summer Salad",
      image: "Summer Salad.jpg",
      description: "A light and refreshing salad perfect for warm weather.",
      time: "15 min",
      servings: 4,
      categories: ["lunch", "salad"],
      cuisine: "mediterranean",
      diet: ["vegetarian", "gluten-free"],
      badge: "",
      rating: 4.6,
      ratingCount: 55,
      tags: ["Salad", "Summer", "Healthy", "Vegetarian"],
      ingredients: ["mixed greens", "cherry tomatoes", "cucumber", "red onion", "bell pepper", "feta cheese", "olives", "lemon vinaigrette"],
      instructions: [
        "Wash and chop all vegetables.",
        "Combine greens, tomatoes, cucumber, onion, and bell pepper in a large bowl.",
        "Add feta cheese and olives.",
        "Drizzle with lemon vinaigrette and toss gently.",
        "Serve immediately."
      ]
    },
    {
      name: "Classic Pasta Dish",
      image: "Classic Pasta Dish.jpg",
      description: "A timeless and comforting pasta dish for any occasion.",
      time: "30 min",
      servings: 4,
      categories: ["dinner", "pasta"],
      cuisine: "italian",
      diet: [],
      badge: "",
      rating: 4.5,
      ratingCount: 90,
      tags: ["Pasta", "Italian", "Classic"],
      ingredients: ["pasta", "olive oil", "garlic", "tomatoes", "basil", "parmesan cheese"],
      instructions: [
        "Cook pasta according to package directions.",
        "While pasta cooks, heat olive oil and sauté garlic.",
        "Add tomatoes and simmer briefly.",
        "Drain pasta and toss with sauce.",
        "Stir in fresh basil and top with Parmesan cheese.",
        "Serve immediately."
      ]
    }
];

function initializeRecipesLocalStorage() {
    if (!localStorage.getItem("recipes")) {
      localStorage.setItem("recipes", JSON.stringify(recipes))
    }
}
  
initializeRecipesLocalStorage();
  
  
function loadRecipes() {
    const recipesData = localStorage.getItem('recipes')
    return recipesData ? JSON.parse(recipesData) : [];
}


function renderManageRecipes() {
    const manageRecipesList = document.getElementById("admin-manage-recipes-list");
    const currentRecipes = loadRecipes();

    manageRecipesList.innerHTML = "";
    currentRecipes.forEach(recipe => {
        const listItem = document.createElement("li")
        listItem.classList.add("manage-recipe-item")

        listItem.innerHTML = `
            <div class="overLap-2">
                <div class="div-wrapper">
                    <div class="overlap-group-2"><span class="text-wrapper-5">${recipe.name}</span></div>
                </div>
                <button class="button-2"><span class="text-wrapper-6">Edit</span></button>
                <button class="button-3"><span class="text-wrapper-7">Remove</span></button>
            </div>
            `;
        
        manageRecipesList.appendChild(listItem);
    })

}

document.addEventListener('DOMContentLoaded', function() {
    displayRecipes();
    
    // Add event listener for the manage recipes section
    const recipeList = document.getElementById('recipe-list');
    if (recipeList) {
        recipeList.addEventListener('click', function(e) {
            if (e.target.classList.contains('delete-btn')) {
                deleteRecipe(e.target.dataset.recipe);
            } else if (e.target.classList.contains('edit-btn')) {
                editRecipe(e.target.dataset.recipe);
            }
        });
    }
});

function displayRecipes() {
    const recipeList = document.getElementById('recipe-list');
    if (!recipeList) return;
    
    // Clear the list
    recipeList.innerHTML = '';
    
    // Get recipes from localStorage or use the default recipes array
    let recipes = JSON.parse(localStorage.getItem('recipes')) || window.recipes || [];
    
    // Display each recipe
    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-item';
        recipeItem.innerHTML = `
            <div class="recipe-info">
                <img src="../images/${recipe.image}" alt="${recipe.name}" class="recipe-thumbnail">
                <h3>${recipe.name}</h3>
            </div>
            <div class="recipe-actions">
                <button class="edit-btn" data-recipe="${recipe.name}">Edit</button>
                <button class="delete-btn" data-recipe="${recipe.name}">Delete</button>
            </div>
        `;
        recipeList.appendChild(recipeItem);
    });
}

function deleteRecipe(recipeName) {
    if (confirm(`Are you sure you want to delete ${recipeName}?`)) {
        // Get recipes from localStorage
        let recipes = JSON.parse(localStorage.getItem('recipes')) || window.recipes || [];
        
        // Find the recipe index
        const recipeIndex = recipes.findIndex(recipe => recipe.name === recipeName);
        
        if (recipeIndex !== -1) {
            // Remove the recipe from the array
            recipes.splice(recipeIndex, 1);
            
            // Update localStorage
            localStorage.setItem('recipes', JSON.stringify(recipes));
            
            // Refresh the display
            displayRecipes();
            
            alert(`${recipeName} has been deleted.`);
        }
    }
}

function editRecipe(recipeName) {
    // Store the recipe name to edit in localStorage
    localStorage.setItem('editRecipe', recipeName);
    
    // Redirect to edit page
    window.location.href = 'edit_recipe.html';
}


function renderManageRecipes() {
    const manageRecipesList = document.getElementById("admin-manage-recipes-list");
    const currentRecipes = loadRecipes();

    manageRecipesList.innerHTML = "";
    currentRecipes.forEach(recipe => {
        const listItem = document.createElement("li")
        listItem.classList.add("manage-recipe-item")

        listItem.innerHTML = `
            <div class="overLap-2">
                <div class="div-wrapper">
                    <div class="overlap-group-2"><span class="text-wrapper-5">${recipe.name}</span></div>
                </div>
                <button class="button-2"><span class="text-wrapper-6">Edit</span></button>
                <button class="button-3"><span class="text-wrapper-7">Remove</span></button>
            </div>
            `;
        
        manageRecipesList.appendChild(listItem);
    })

}

document.addEventListener('DOMContentLoaded', function() {
    renderManageRecipes();
    
    // Handle edit and delete button clicks using event delegation
    document.getElementById('admin-manage-recipes-list').addEventListener('click', function(e) {
        if (e.target.closest('.button-2')) {
            const recipeName = e.target.closest('.overLap-2').querySelector('.text-wrapper-5').textContent;
            editRecipe(recipeName);
        } else if (e.target.closest('.button-3')) {
            const recipeName = e.target.closest('.overLap-2').querySelector('.text-wrapper-5').textContent;
            deleteRecipe(recipeName);
        }
    });
});

function deleteRecipe(recipeName) {
    if (confirm(`Are you sure you want to delete "${recipeName}"?`)) {
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const index = recipes.findIndex(r => r.name === recipeName);
        
        if (index !== -1) {
            recipes.splice(index, 1);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            renderManageRecipes(); // Refresh the list
        }
    }
}

function editRecipe(recipeName) {
    localStorage.setItem('editRecipe', recipeName);
    window.location.href = 'edit_recipe.html';
}