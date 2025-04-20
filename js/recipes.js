const recipes = [
  {
    name: "Shrimp Noodle Soup",
    image: "Shrimp Noodle Soup.jpg",
    description: "A vibrant bowl of Vietnamese-style noodle soup with fresh shrimp and herbs.",
    time: "30 min",
    servings: 4,
    categories: ["lunch", "dinner"],
    cuisine: "asian",
    diet: []
  },
  {
    name: "Healthy Rice Bowl",
    image: "Healthy Rice.jpg",
    description: "Brown rice bowl with roasted vegetables, soft-boiled egg, and tahini dressing.",
    time: "20 min",
    servings: 2,
    categories: ["lunch"],
    cuisine: "mediterranean",
    diet: ["vegetarian"]
  },
  {
    name: "Cheese Cake",
    image: "Cheese Cake.jpg",
    description: "Classic creamy cheesecake with a buttery graham cracker crust.",
    time: "1 hr",
    servings: 8,
    categories: ["desserts"],
    cuisine: "mediterranean",
    diet: ["vegetarian"]
  },
  {
    name: "Shish Tawook",
    image: "Shish Tawook.jpg",
    description: "Grilled marinated chicken skewers served with garlic sauce.",
    time: "40 min",
    servings: 4,
    categories: ["dinner"],
    cuisine: "mediterranean",
    diet: []
  },
  {
    name: "Macarons",
    image: "Macarons.jpg",
    description: "Delicate French cookies with a crisp shell and creamy filling.",
    time: "1.5 hrs",
    servings: 12,
    categories: ["desserts", "snacks"],
    cuisine: "mediterranean",
    diet: ["gluten-free"]
  },
  {
    name: "Salamon",
    image: "Salamon.jpg",
    description: "Oven-baked salmon fillet with lemon and herbs.",
    time: "25 min",
    servings: 2,
    categories: ["lunch", "dinner"],
    cuisine: "mediterranean",
    diet: ["keto", "gluten-free"]
  },
  {
    name: "Fried Rice",
    image: "Fried Rice.jpg",
    description: "Quick and easy fried rice with vegetables and eggs.",
    time: "15 min",
    servings: 3,
    categories: ["lunch", "dinner"],
    cuisine: "asian",
    diet: ["vegetarian"]
  },
  {
    name: "Chicken Wings",
    image: "Chicken Wings.jpg",
    description: "Crispy baked chicken wings tossed in a spicy buffalo sauce.",
    time: "50 min",
    servings: 4,
    categories: ["snacks", "dinner"],
    cuisine: "mediterranean",
    diet: []
  },
  {
    name: "Chocolate Cake",
    image: "Chocolate Cake.jpg",
    description: "Moist chocolate cake layered with rich chocolate frosting.",
    time: "1 hr",
    servings: 8,
    categories: ["desserts"],
    cuisine: "mediterranean",
    diet: ["vegetarian"]
  },
  {
    name: "Green Salad",
    image: "Green Salad.jpg",
    description: "Fresh greens tossed with a light vinaigrette.",
    time: "10 min",
    servings: 2,
    categories: ["lunch"],
    cuisine: "mediterranean",
    diet: ["vegetarian", "gluten-free"]
  },
  {
    name: "Ramen",
    image: "Ramen.jpg",
    description: "Japanese noodle soup with pork broth and toppings.",
    time: "45 min",
    servings: 2,
    categories: ["dinner"],
    cuisine: "asian",
    diet: []
  },
  {
    name: "Sezar Salad",
    image: "Sezar Salad.jpg",
    description: "Classic Caesar salad with romaine, croutons, and parmesan.",
    time: "15 min",
    servings: 2,
    categories: ["lunch"],
    cuisine: "mediterranean",
    diet: ["vegetarian"]
  },
  {
    name: "Burrito",
    image: "Burrito.jpg",
    description: "Hearty tortilla wrap filled with beans, rice, and meat.",
    time: "25 min",
    servings: 1,
    categories: ["lunch", "dinner"],
    cuisine: "mexican",
    diet: []
  },
  {
    name: "Steak",
    image: "Steak.jpg",
    description: "Grilled beef steak seasoned to perfection.",
    time: "30 min",
    servings: 2,
    categories: ["dinner"],
    cuisine: "mediterranean",
    diet: ["keto"]
  },
  {
    name: "Red Sauce Pasta",
    image: "Red Sauce Pasta.jpg",
    description: "Pasta tossed in tangy tomato sauce with herbs.",
    time: "20 min",
    servings: 2,
    categories: ["lunch", "dinner"],
    cuisine: "italian",
    diet: ["vegetarian"]
  },
  {
    name: "Fettuccine",
    image: "Fettuccine.jpg",
    description: "Creamy fettuccine Alfredo with parmesan cheese.",
    time: "25 min",
    servings: 2,
    categories: ["dinner"],
    cuisine: "italian",
    diet: ["vegetarian"]
  },
  {
    name: "Spaghetti",
    image: "Spaghetti.jpg",
    description: "Spaghetti with rich marinara sauce and meatballs.",
    time: "30 min",
    servings: 3,
    categories: ["dinner"],
    cuisine: "italian",
    diet: []
  },
  {
    name: "Shrimp Pasta",
    image: "Shrimp Pasta.jpg",
    description: "Garlic butter shrimp tossed in linguine pasta.",
    time: "35 min",
    servings: 2,
    categories: ["dinner"],
    cuisine: "italian",
    diet: []
  },
  {
    name: "Cherry Tomato Pasta",
    image: "Cherry Tomato Pasta.jpg",
    description: "Fresh cherry tomatoes with spaghetti and basil.",
    time: "20 min",
    servings: 2,
    categories: ["lunch", "dinner"],
    cuisine: "italian",
    diet: ["vegetarian"]
  },
  {
    name: "Truffle Parmesan Pasta",
    image: "Truffle Parmesan Pasta.jpg",
    description: "Creamy truffle pasta with parmesan and mushrooms.",
    time: "25 min",
    servings: 2,
    categories: ["dinner"],
    cuisine: "italian",
    diet: ["vegetarian"]
  },
  {
    name: "Burger",
    image: "Burger.jpg",
    description: "Juicy beef burger with cheese, lettuce, and tomato.",
    time: "30 min",
    servings: 1,
    categories: ["lunch", "dinner"],
    cuisine: "american", 
    diet: []
  }
];
  

  

function searchAndFilter() 
{
  const searchBarInput = document.getElementById("search-input")
  const categoryFilterSelect = document.getElementById("category-filter")
  const cuisineFilterSelect = document.getElementById("cuisine-filter")
  const dietFilterSelect = document.getElementById("diet-filter")
  

  const query = searchBarInput.value.toLowerCase()
  const categoryFilter = categoryFilterSelect.value.toLowerCase()
  const cuisineFilter = cuisineFilterSelect.value.toLowerCase()
  const dietFilter = dietFilterSelect.value.toLowerCase()


  filterdOnSearch = recipes.filter(
    recipe => recipe.name.toLowerCase().includes(query)
  )

  if (categoryFilter !== "") {
    filteredOnCategory = filterdOnSearch.filter(
      recipe => (recipe.map(
        category => category.toLowerCase())).includes(categoryFilter)
    )
  }


  return filterdOnSearch
  
}



const searchBarSubmitButton = document.getElementById("search_submit_button")

searchBarSubmitButton.addEventListener("click", () => 
  {
    event.preventDefault();
    
    const filteredResults = searchAndFilter()
    
    renderRecipes(filteredResults);
    
    const featuredCategoriesSection = document.getElementById("featured-categories")
    featuredCategoriesSection.classList.add("hidden");
  })
  
  


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
