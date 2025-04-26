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
      ingredients: ["broth", "soy sauce", "sesame oil", "ginger", "garlic", "noodles", "shrimp", "mushrooms", "bok choy", "green onions"]
    },
    {
      name: "Healthy Rice Bowl",
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
      ingredients: ["rice", "chickpeas", "spinach", "avocado", "tomatoes", "cucumber", "carrots", "tahini"]
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
      ingredients: ["graham crackers", "butter", "sugar", "cream cheese", "sour cream", "vanilla", "eggs"]
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
      ingredients: ["yogurt", "lemon", "olive oil", "garlic", "tomato paste", "paprika", "cumin", "coriander", "chicken", "onion", "bell peppers"]
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
      ingredients: ["almond flour", "powdered sugar", "egg whites", "cream of tartar", "butter", "vanilla"]
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
      ingredients: ["salmon", "lemon", "garlic", "dill", "olive oil"]
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
      ingredients: ["rice", "eggs", "soy sauce", "garlic", "vegetables"]
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
      ingredients: ["chicken wings", "baking powder", "garlic powder", "salt", "pepper"]
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
      ingredients: ["flour", "sugar", "cocoa powder", "baking soda", "vanilla", "vinegar"]
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
      ingredients: ["lettuce", "tomatoes", "cucumber", "avocado", "onion", "feta cheese"]
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
      ingredients: ["pork bones", "chicken", "noodles", "soy sauce", "garlic", "ginger"]
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
      ingredients: ["romaine", "parmesan", "croutons", "anchovies", "garlic", "mustard"]
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
      ingredients: ["beef", "beans", "rice", "tortillas", "cheese"]
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
      ingredients: ["steak", "garlic", "rosemary", "thyme", "butter"]
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
      ingredients: ["pasta", "tomatoes", "garlic", "basil"]
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
      ingredients: ["pasta", "cream", "parmesan", "butter"]
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
      ingredients: ["pasta", "marinara sauce", "meatballs"]
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
      ingredients: ["shrimp", "pasta", "garlic", "butter"]
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
      ingredients: ["pasta", "cherry tomatoes", "basil"]
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
      ingredients: ["pasta", "truffle", "parmesan", "mushrooms"]
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
      ingredients: ["beef", "cheese", "lettuce", "tomato"]
    }
  ];
  
  
  
  window.print = () => {}
  
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      search() ;
    }
  })
  
  
  
  function search() 
  {
    const searchBarInput = document.getElementById("recipes-search-input")
    const query = searchBarInput.value.toLowerCase()
  
    if (!(query === "")) {
  
      filterdResults = recipes.filter(
        recipe => recipe.name.toLowerCase().includes(query) || recipe.ingredients.includes(query)
      )
    
      renderRecipes(filterdResults)
    } 
  }
  
  
  function renderRecipes(recipes) 
  {
    const recipesCardsGrid = document.querySelector(".recipe-grid")
    recipesCardsGrid.innerHTML = generateRecipesGrid(recipes)
  }
  
  
  function generateRecipesGrid(recipes) {
    return recipes.map(recipe => {
        const recipeId = recipe.slug || recipe.name.toLowerCase().replace(/\s+/g, "-");
        const recipeLink = `all-recipes.html#${recipeId}`;
        
        return `
            <div class="recipe-card">
                <a href="${recipeLink}" class="recipe-link" data-recipe-id="${recipeId}">
                    <img src="../images/${recipe.image}" alt="${recipe.name}" class="recipe-image">
                    <div class="recipe-title">${recipe.name}</div>
                    <div class="recipe-desc">${recipe.description}</div>
                </a>
                <i class="fas fa-heart favorite-icon favorited" data-recipe-name="${recipe.name}"></i>
            </div>
        `;
    }).join("");
  }

  // Main initialization when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const recipesCardsGrid = document.querySelector(".recipe-grid");
    const searchBar = document.getElementById("recipes-search-input");

    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        // User is not logged in - show login message
        recipesCardsGrid.innerHTML = `
            <div class="login-message">
                <i class="fas fa-lock login-icon"></i>
                <p>Please log in to view your favorite recipes</p>
                <a href="login.html" class="btn login-button">Login</a>
            </div>
        `;
        // Hide search bar when not logged in
        if (searchBar) {
            searchBar.style.display = 'none';
        }
        return;
    }

    // User is logged in - get their favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.length === 0) {
        // No favorites yet
        recipesCardsGrid.innerHTML = `
            <div class="no-favorites" style="text-align: center; padding: 20px; width: 100%;">
                <p style="font-size: 1.2em;">You haven't added any favorite recipes yet</p>
                <a href="recipes.html" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">Browse Recipes</a>
            </div>
        `;
        if (searchBar) {
            searchBar.style.display = 'none';
        }
        return;
    }

    // Filter recipes to show only favorites
    const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.name));
    renderRecipes(favoriteRecipes);

    // Add event listener for the search bar
    if (searchBar) {
        searchBar.addEventListener('input', () => {
            const query = searchBar.value.toLowerCase();
            let filteredRecipes = favoriteRecipes;

            if (query) {
                filteredRecipes = favoriteRecipes.filter(
                    recipe => recipe.name.toLowerCase().includes(query) ||
                             recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
                );
            }

            if (filteredRecipes.length > 0) {
                renderRecipes(filteredRecipes);
            } else {
                recipesCardsGrid.innerHTML = '<p style="text-align: center; margin-top: 20px;">No matching favorite recipes found.</p>';
            }
        });
    }

    // Add event listener for removing favorites
    recipesCardsGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('favorite-icon')) {
            const recipeName = event.target.getAttribute('data-recipe-name');
            let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            
            // Remove from favorites
            favorites = favorites.filter(name => name !== recipeName);
            localStorage.setItem('favorites', JSON.stringify(favorites));

            // If no favorites left, show the "no favorites" message
            if (favorites.length === 0) {
                recipesCardsGrid.innerHTML = `
                    <div class="no-favorites" style="text-align: center; padding: 20px; width: 100%;">
                        <p style="font-size: 1.2em;">You haven't added any favorite recipes yet</p>
                        <a href="recipes.html" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">Browse Recipes</a>
                    </div>
                `;
                if (searchBar) {
                    searchBar.style.display = 'none';
                }
            } else {
                // Re-render the remaining favorites
                const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.name));
                renderRecipes(favoriteRecipes);
            }
        }
    });
  });