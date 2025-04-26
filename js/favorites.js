window.print = () => {}

function loadRecipes() {
  const recipesData = localStorage.getItem('recipes')
  return recipesData ? JSON.parse(recipesData) : [];
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
  const favoriteRecipes = loadRecipes().filter(recipe => favorites.includes(recipe.name));
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
              const favoriteRecipes = loadRecipes().filter(recipe => favorites.includes(recipe.name));
              renderRecipes(favoriteRecipes);
          }
      }
  });
});
