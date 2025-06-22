import { getCookie } from './getCookie.js';
window.print = () => {}

document.addEventListener('DOMContentLoaded', async () => {
    // Recipe list now handled server-side in Django template
    

    // Old recipe-list event listeners removed - using server-rendered list with updated event handling

    document.getElementById('admin-manage-recipes-list').addEventListener('click', function(e) {
      if (e.target.closest('.button-2')) {
        const recipeId = e.target.closest('.button-2').dataset.recipeId;
        const recipeName = e.target.closest('.overlap-2').querySelector('.text-wrapper-5').textContent;
        editRecipeById(recipeId, recipeName);
      } else if (e.target.closest('.button-3')) {
        const recipeId = e.target.closest('.button-3').dataset.recipeId;
        const recipeName = e.target.closest('.button-3').dataset.recipeName;
        deleteRecipeById(recipeId, recipeName);
      }
    });
});


// renderManageRecipes function removed - now handled server-side by Django template

// displayRecipes function removed - recipe list now handled server-side by Django template


async function deleteRecipeById(recipeId, recipeName) {
    if (confirm(`Are you sure you want to delete "${recipeName}"?`)) {
        const endpoint = "http://127.0.0.1:8000/recipes/" + recipeId;
        
        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });

            if (response.status === 204) {
                // Reload the page to reflect changes server-side
                location.reload();
            } else {
                console.error(`Failed to delete recipe "${recipeName}". Server returned status: ${response.status}`);
                alert(`Failed to delete recipe. Server error: ${response.status}`);
            }
        } catch(error) {
            console.error(`Network error while deleting recipe "${recipeName}":`, error.message);
            alert(`Failed to connect to server. Please check your internet connection and try again.\nError: ${error.message}`);
        }
    }
}

function editRecipeById(recipeId, recipeName) {
    console.log('Editing recipe:', recipeName, 'with ID:', recipeId);
    localStorage.setItem('editRecipe', recipeName);
    localStorage.setItem('editRecipeId', recipeId);
    const editUrl = '/edit-recipe/?id=' + recipeId;
    console.log('Redirecting to:', editUrl);
    window.location.href = editUrl;
}