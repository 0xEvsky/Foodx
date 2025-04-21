const recipes = [
    {
      name: "Shrimp Noodle Soup",
      image: "Shrimp Noodle Soup.jpg",
      description: "A vibrant bowl of Vietnamese-style noodle soup with fresh shrimp and herbs.",
      time: "30 min",
      servings: 4,
      tags: ["Asian", "Seafood"],
      badge: "New",
      rating: 4.8,
      ratingCount: 124
    },
    {
      name: "Healthy Rice Bowl",
      image: "Healthy Rice.jpg",
      description: "Brown rice bowl with roasted vegetables, soft-boiled egg, and tahini dressing.",
      time: "20 min",
      servings: 2,
      tags: ["Vegetarian", "Healthy"],
      badge: "Trending",
      rating: 4.6,
      ratingCount: 98
    },
    {
      name: "Cheese Cake",
      image: "Cheese Cake.jpg",
      description: "Classic creamy cheesecake with a buttery graham cracker crust.",
      time: "1 hr",
      servings: 8,
      tags: ["Dessert"],
      badge: "Popular",
      rating: 4.7,
      ratingCount: 215
    },
    {
      name: "Shish Tawook",
      image: "Shish Tawook.jpg",
      description: "Grilled marinated chicken skewers served with garlic sauce.",
      time: "40 min",
      servings: 4,
      tags: ["Middle Eastern", "Grill"],
      badge: "Trending",
      rating: 4.9,
      ratingCount: 310
    },
    {
      name: "Macarons",
      image: "Macarons.jpg",
      description: "Delicate French cookies with a crisp shell and creamy filling.",
      time: "1.5 hrs",
      servings: 12,
      tags: ["Dessert", "French"],
      badge: "New",
      rating: 4.5,
      ratingCount: 95
    },
    {
      name: "Salamon",
      image: "Salamon.jpg",
      description: "Oven-baked salmon fillet with lemon and herbs.",
      time: "25 min",
      servings: 2,
      tags: ["Seafood", "Healthy"],
      badge: "Popular",
      rating: 4.8,
      ratingCount: 200
    },
    {
      name: "Fried Rice",
      image: "Fried Rice.jpg",
      description: "Quick and easy fried rice with vegetables and eggs.",
      time: "15 min",
      servings: 3,
      tags: ["Asian", "Quick"],
      badge: "",
      rating: 4.4,
      ratingCount: 80
    },
    {
      name: "Chicken Wings",
      image: "Chicken Wings.jpg",
      description: "Crispy baked chicken wings tossed in a spicy buffalo sauce.",
      time: "50 min",
      servings: 4,
      tags: ["Snack", "Spicy"],
      badge: "Trending",
      rating: 4.6,
      ratingCount: 180
    },
    {
      name: "Chocolate Cake",
      image: "Chocolate Cake.jpg",
      description: "Moist chocolate cake layered with rich chocolate frosting.",
      time: "1 hr",
      servings: 8,
      tags: ["Dessert", "Chocolate"],
      badge: "",
      rating: 4.9,
      ratingCount: 250
    },
    {
      name: "Green Salad",
      image: "Green Salad.jpg",
      description: "Fresh greens tossed with a light vinaigrette.",
      time: "10 min",
      servings: 2,
      tags: ["Salad", "Healthy"],
      badge: "",
      rating: 4.3,
      ratingCount: 60
    },
    {
      name: "Ramen",
      image: "Ramen.jpg",
      description: "Japanese noodle soup with pork broth and toppings.",
      time: "45 min",
      servings: 2,
      tags: ["Asian", "Noodles"],
      badge: "New",
      rating: 4.7,
      ratingCount: 170
    },
    {
      name: "Sezar Salad",
      image: "Sezar Salad.jpg",
      description: "Classic Caesar salad with romaine, croutons, and parmesan.",
      time: "15 min",
      servings: 2,
      tags: ["Salad"],
      badge: "",
      rating: 4.2,
      ratingCount: 78
    },
    {
      name: "Burrito",
      image: "Burrito.jpg",
      description: "Hearty tortilla wrap filled with beans, rice, and meat.",
      time: "25 min",
      servings: 1,
      tags: ["Mexican"],
      badge: "",
      rating: 4.4,
      ratingCount: 122
    },
    {
      name: "Steak",
      image: "Steak.jpg",
      description: "Grilled beef steak seasoned to perfection.",
      time: "30 min",
      servings: 2,
      tags: ["Grill", "Meat"],
      badge: "Popular",
      rating: 4.9,
      ratingCount: 300
    },
    {
      name: "Red Sauce Pasta",
      image: "Red Sauce Pasta.jpg",
      description: "Pasta tossed in tangy tomato sauce with herbs.",
      time: "20 min",
      servings: 2,
      tags: ["Italian", "Vegetarian"],
      badge: "",
      rating: 4.5,
      ratingCount: 140
    },
    {
      name: "Fettuccine",
      image: "Fettuccine.jpg",
      description: "Creamy fettuccine Alfredo with parmesan cheese.",
      time: "25 min",
      servings: 2,
      tags: ["Italian"],
      badge: "",
      rating: 4.6,
      ratingCount: 130
    },
    {
      name: "Spaghetti",
      image: "Spaghetti.jpg",
      description: "Spaghetti with rich marinara sauce and meatballs.",
      time: "30 min",
      servings: 3,
      tags: ["Italian", "Classic"],
      badge: "",
      rating: 4.7,
      ratingCount: 150
    },
    {
      name: "Shrimp Pasta",
      image: "Shrimp Pasta.jpg",
      description: "Garlic butter shrimp tossed in linguine pasta.",
      time: "35 min",
      servings: 2,
      tags: ["Seafood", "Pasta"],
      badge: "",
      rating: 4.8,
      ratingCount: 143
    },
    {
      name: "Cherry Tomato Pasta",
      image: "Cherry Tomato Pasta.jpg",
      description: "Fresh cherry tomatoes with spaghetti and basil.",
      time: "20 min",
      servings: 2,
      tags: ["Vegetarian"],
      badge: "New",
      rating: 4.5,
      ratingCount: 89
    },
    {
      name: "Truffle Parmesan Pasta",
      image: "Truffle Parmesan Pasta.jpg",
      description: "Creamy truffle pasta with parmesan and mushrooms.",
      time: "25 min",
      servings: 2,
      tags: ["Gourmet"],
      badge: "Trending",
      rating: 4.9,
      ratingCount: 165
    },
    {
      name: "Burger",
      image: "Burger.jpg",
      description: "Juicy beef burger with cheese, lettuce, and tomato.",
      time: "30 min",
      servings: 1,
      tags: ["Fast Food"],
      badge: "",
      rating: 4.6,
      ratingCount: 190
    }
  ];
  

  
function renderRecipes(recipes) 
{
    const recipesCardsGrid = document.querySelector(".recipe-grid")
    recipesCardsGrid.innerHTML = ""

    recipes.forEach(recipe => {
        const article = document.createElement("article")
        article.classList.add("recipe-card");

        article.innerHTML = `
            <div class="recipe-image">
                <img src="../images/${recipe.image}" alt="${recipe.name}">
                <div class="recipe-badges">
                    <span class="badge-${recipe.badge.toLowerCase()}">${recipe.badge}</span>
                    <button class="favorite-btn"><i class="far fa-heart"></i></button>
                </div>
        </div>
        <div class="recipe-content">
            <div class="recipe-meta">
                <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                <span><i class="fas fa-user-friends"></i> ${recipe.servings}</span>
            </div>
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <div class="recipe-tags">
                ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <div class="recipe-footer">
                <div class="recipe-rating">
                    <i class="fas fa-star"></i>
                    <span>${recipe.rating}</span>
            </div>
            <a href="recipe.html" class="view-recipe">View Recipe <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
        `;


        recipesCardsGrid.appendChild(article)
    });
}


const search_bar_input = document.getElementById("search-input")
const search_bar_submit_button = document.getElementById("search_submit_button")
const featured_categories_section = document.getElementById("featured-categories")

search_bar_submit_button.addEventListener("click", () => 
    {
        event.preventDefault();

        const query = search_bar_input.value.toLowerCase();

        const filteredResults = recipes.filter( 
            recipe => recipe.name.toLowerCase().includes(query)
        )

        renderRecipes(filteredResults);
        featured_categories_section.classList.add("hidden");
    })