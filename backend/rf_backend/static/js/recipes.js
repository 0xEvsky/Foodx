// Recipe cards now rendered server-side via Django template
// This file handles only dynamic interactions (search, favorites)

document.addEventListener('DOMContentLoaded', async () => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        localStorage.setItem('isLoggedIn', 'true');
    }

    // Initialize favorites display on server-rendered cards
    updateFavoriteIcons();

    // Handle favorites
    const recipesCardsGrid = document.querySelector(".recipe-grid");
    recipesCardsGrid.addEventListener('click', handleFavoriteClick);

    // Search functionality - now works with server-rendered cards
    const searchBarInput = document.getElementById("recipes-search-input");
    if (searchBarInput) {
        searchBarInput.addEventListener('input', () => {
            const query = searchBarInput.value.toLowerCase();
            const recipeCards = document.querySelectorAll('.recipe-grid .recipe-link');
            let visibleCount = 0;
            
            recipeCards.forEach(card => {
                const recipeName = card.querySelector('.recipe-title').textContent.toLowerCase();
                const recipeDesc = card.querySelector('.recipe-desc').textContent.toLowerCase();
                
                if (query === '' || recipeName.includes(query) || recipeDesc.includes(query)) {
                    card.parentElement.style.display = 'block';
                    visibleCount++;
                } else {
                    card.parentElement.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            let noResultsMsg = document.querySelector('.no-results-message');
            if (visibleCount === 0 && query !== '') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('p');
                    noResultsMsg.className = 'no-results-message';
                    noResultsMsg.style.cssText = 'text-align: center; margin-top: 20px; grid-column: 1 / -1;';
                    noResultsMsg.textContent = 'No matching recipes found.';
                    document.querySelector('.recipe-grid').appendChild(noResultsMsg);
                }
                noResultsMsg.style.display = 'block';
            } else {
                if (noResultsMsg) {
                    noResultsMsg.style.display = 'none';
                }
            }
        });
    }
});

// renderRecipes and generateRecipesGrid functions removed - now handled server-side by Django template

function updateFavoriteIcons() {
    // Update favorite icons on server-rendered cards based on localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteIcons = document.querySelectorAll('.favorite-icon');
    
    favoriteIcons.forEach(icon => {
        const recipeName = icon.getAttribute('data-recipe-name');
        const isFavorited = favorites.includes(recipeName);
        
        if (isFavorited) {
            icon.classList.remove('far');
            icon.classList.add('fas', 'favorited');
            icon.title = 'Remove from favorites';
        } else {
            icon.classList.remove('fas', 'favorited');
            icon.classList.add('far');
            icon.title = 'Add to favorites';
        }
    });
}

function handleFavoriteClick(event) {
    if (event.target.classList.contains('favorite-icon')) {
        event.preventDefault();

        const icon = event.target;
        const recipeName = icon.getAttribute('data-recipe-name');
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (icon.classList.contains('favorited')) {
            // Remove from favorites
            favorites = favorites.filter(name => name !== recipeName);
            icon.classList.remove('fas', 'favorited');
            icon.classList.add('far');
            icon.title = 'Add to favorites';
            console.log('Removed from favorites:', recipeName);
        } else {
            // Add to favorites
            favorites.push(recipeName);
            icon.classList.remove('far');
            icon.classList.add('fas', 'favorited');
            icon.title = 'Remove from favorites';
            console.log('Added to favorites:', recipeName);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Updated favorites:', favorites);
    }
}

