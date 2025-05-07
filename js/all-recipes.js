

document.addEventListener('DOMContentLoaded', () => {
    let recipeId = window.location.hash.substring(1); 

    if (recipeId) {
        showRecipe(recipeId);
    }

    window.addEventListener('hashchange', () => {
        recipeId = window.location.hash.substring(1);
        showRecipe(recipeId);
    });
});

function showRecipe(recipeIdFromHash) {
    const recipe = recipes.find(r => r.slug === recipeIdFromHash || 
                                   (!r.slug && r.name.toLowerCase().replace(/\s+/g, "-") === recipeIdFromHash));
    
    if (!recipe) {
        console.error('Recipe not found:', recipeIdFromHash);
        return;
    }

    document.querySelectorAll('.recipe-card').forEach(card => {
        card.style.display = 'none';
    });

    const recipeCard = document.getElementById(recipe.name.toLowerCase().replace(/\s+/g, "-")) || createRecipeCard(recipe);
    recipeCard.style.display = 'block';

    recipeCard.scrollIntoView({ behavior: 'smooth' });
}

function createRecipeCard(recipe) {
    const recipeId = recipe.slug || recipe.name.toLowerCase().replace(/\s+/g, "-");
    
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.id = recipeId;

    card.innerHTML = `
        <div class="back-navigation">
            <a href="recipes.html" class="back-button"><i class="fas fa-arrow-left"></i> Back to Recipes</a>
        </div>
        <div class="recipe-header">
            <img src="../images/${recipe.image}" alt="${recipe.name}" class="recipe-image-large">
            <div class="recipe-title-section">
                <h1 class="section-title">${recipe.name}</h1>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                    <span><i class="fas fa-user-friends"></i> Serves ${recipe.servings}</span>
                    <span><i class="fas fa-star"></i> ${recipe.rating} (${recipe.ratingCount} reviews)</span>
                </div>
                <div class="recipe-tags">
                    ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>

        <section class="recipe-overview">
            <h2>Overview</h2>
            <p>${recipe.description}</p>
        </section>

        <section class="recipe-ingredients">
            <h2>Ingredients</h2>
            <div class="ingredients-grid">
                <div class="ingredient-group">
                    <ul>
                        ${recipe.ingredients.map(ingredient => `
                            <li>
                                <span class="ingredient-name">${ingredient}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </section>

        <section class="recipe-instructions">
            <h2>Instructions</h2>
            <ol class="instructions-list">
                ${recipe.instructions.map((step, index) => `
                    <li class="instruction-step">
                        <span class="step-number">${index + 1}</span>
                        <div class="step-content">
                            <p>${step}</p>
                        </div>
                    </li>
                `).join('')}
            </ol>
        </section>

        <section class="recipe-actions">
            <button class="favorite-btn ${isFavorite(recipe.name) ? 'favorited' : ''}" onclick="toggleFavorite('${recipe.name}')">
                <i class="fa${isFavorite(recipe.name) ? 's' : 'r'} fa-heart"></i>
                ${isFavorite(recipe.name) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </section>
    `;

    const container = document.querySelector('.container');
    container.appendChild(card);

    return card;
}

function isFavorite(recipeName) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(recipeName);
}

function toggleFavorite(recipeName) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFav = favorites.includes(recipeName);
    
    if (isFav) {
        favorites = favorites.filter(name => name !== recipeName);
    } else {
        favorites.push(recipeName);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    const btn = document.querySelector(`button.favorite-btn`);
    btn.innerHTML = `
        <i class="fa${!isFav ? 's' : 'r'} fa-heart"></i>
        ${!isFav ? 'Remove from Favorites' : 'Add to Favorites'}
    `;
    btn.classList.toggle('favorited');
} 