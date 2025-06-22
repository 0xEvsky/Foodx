import { loadRecipes } from './loadData.js';
const recipes = []


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
                  <img src="/static/images/${recipe.image}" alt="${recipe.name}" class="recipe-image">
                  <div class="recipe-title">${recipe.name}</div>
                  <div class="recipe-desc">${recipe.description}</div>
              </a>
              <i class="fas fa-heart favorite-icon favorited" data-recipe-name="${recipe.name}"></i>
          </div>
      `;
  }).join("");
}


document.addEventListener('DOMContentLoaded', async () => {
    await loadRecipes(recipes)
    const recipesCardsGrid = document.querySelector(".recipe-grid");
    const searchBar = document.getElementById("recipes-search-input");

    // For testing, simulate login
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        localStorage.setItem('isLoggedIn', 'true');
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    console.log('Current favorites:', favorites);
    console.log('Available recipes:', recipes.map(r => r.name));
    
    if (favorites.length === 0) {
        recipesCardsGrid.innerHTML = `
            <div class="no-favorites" style="text-align: center; padding: 40px; width: 100%;">
                <i class="fas fa-heart" style="font-size: 3em; color: #ccc; margin-bottom: 20px;"></i>
                <p style="font-size: 1.2em; margin-bottom: 20px;">You haven't added any favorite recipes yet</p>
                <a href="recipes.html" style="display: inline-block; padding: 10px 20px; background-color: #e91e63; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">Browse Recipes</a>
            </div>
        `;
        if (searchBar) {
            searchBar.style.display = 'none';
        }
        return;
    }

    // Filter recipes to show only favorites
    const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.name));
    console.log('Filtered favorite recipes:', favoriteRecipes);
    renderRecipes(favoriteRecipes);

    // Search functionality
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

    // Handle favorite removal
    recipesCardsGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('favorite-icon')) {
            event.preventDefault();
            const recipeName = event.target.getAttribute('data-recipe-name');
            let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            
            console.log('Removing from favorites:', recipeName);
            
            // Remove from favorites
            favorites = favorites.filter(name => name !== recipeName);
            localStorage.setItem('favorites', JSON.stringify(favorites));

            // Update display
            if (favorites.length === 0) {
                recipesCardsGrid.innerHTML = `
                    <div class="no-favorites" style="text-align: center; padding: 40px; width: 100%;">
                        <i class="fas fa-heart" style="font-size: 3em; color: #ccc; margin-bottom: 20px;"></i>
                        <p style="font-size: 1.2em; margin-bottom: 20px;">You haven't added any favorite recipes yet</p>
                        <a href="recipes.html" style="display: inline-block; padding: 10px 20px; background-color: #e91e63; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">Browse Recipes</a>
                    </div>
                `;
                if (searchBar) {
                    searchBar.style.display = 'none';
                }
            } else {
                const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.name));
                renderRecipes(favoriteRecipes);
            }
        }
    });
});
