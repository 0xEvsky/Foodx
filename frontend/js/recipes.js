import { loadRecipes } from './getRecipes.js';
window.print = () => {}

const recipesData = [];

document.addEventListener('DOMContentLoaded', async () => {
  await loadRecipes(recipesData)
  renderRecipes(recipesData);

 // favourite recipes
  const recipesCardsGrid = document.querySelector(".recipe-grid");
  recipesCardsGrid.addEventListener('click', handleFavoriteClick);



  const searchBarInput = document.getElementById("recipes-search-input");
  if (searchBarInput) {
    searchBarInput.addEventListener('input', () => {
      const query = searchBarInput.value.toLowerCase();
      
      if (query) {
        filteredRecipes = recipesData.filter(
          recipe => recipe.name.toLowerCase().includes(query) ||
            recipe.ingredients.some(ing => typeof ing === 'string' && ing.toLowerCase().includes(query))
        );
      }

      if (filteredRecipes.length > 0) {
        renderRecipes(filteredRecipes);
      } else {
        const recipesGrid = document.querySelector(".recipe-grid");
        recipesGrid.innerHTML = '<p style="text-align: center; margin-top: 20px;">No matching recipes found.</p>';
      }
    });
  }
});




function renderRecipes(recipes) 
{
  const recipesCardsGrid = document.querySelector(".recipe-grid")
  recipesCardsGrid.innerHTML = generateRecipesGrid(recipes)
}

function generateRecipesGrid(recipes) {
  // Get current favorites to check which recipes are already favorited
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  return recipes.map(recipe => {
    const recipeId = recipe.slug || recipe.name.toLowerCase().replace(/\s+/g, "-");
    const recipeLink = `all-recipes.html#${recipeId}`;
    const isFavorited = favorites.includes(recipe.name);
    const heartIcon = isFavorited ? 'fas fa-heart favorited' : 'far fa-heart';
    
    return `
      <div class="recipe-card">
        <a href="${recipeLink}" class="recipe-link" data-recipe-id="${recipeId}">
          <img src="../images/${recipe.image}" alt="${recipe.name}" class="recipe-image">
          <div class="recipe-title">${recipe.name}</div>
          <div class="recipe-desc">${recipe.description}</div>
        </a>
        <i class="${heartIcon} favorite-icon" data-recipe-name="${recipe.name}"></i>
      </div>
    `;
  }).join("");
}

function handleFavoriteClick(event) {
  if (event.target.classList.contains('favorite-icon')) {

    if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = 'login.html';
      return;
    }

    const icon = event.target;
    const recipeName = icon.getAttribute('data-recipe-name');
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (icon.classList.contains('favorited')) {
      favorites = favorites.filter(name => name !== recipeName);
      icon.classList.remove('fas', 'favorited');
      icon.classList.add('far');
    } else {
      // Add to favorites
      favorites.push(recipeName);
      icon.classList.remove('far');
      icon.classList.add('fas', 'favorited');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

