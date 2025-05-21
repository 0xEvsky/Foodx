import { loadRecipes } from './loadData.js'
import { getCookie } from './getCookie.js';
window.print = () => {}

const recipes = [];



document.addEventListener('DOMContentLoaded', async () => {
    await loadRecipes(recipes)
    displayRecipes();
    renderManageRecipes();
    

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


function renderManageRecipes() {
    const manageRecipesList = document.getElementById("admin-manage-recipes-list");
    const currentRecipes = recipes

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

function displayRecipes() {
  const recipeList = document.getElementById('recipe-list');
  if (!recipeList) return;
    

  recipeList.innerHTML = '';

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


async function deleteRecipe(recipeName) {
    if (confirm(`Are you sure you want to delete "${recipeName}"?`)) {

        let recipe = null;
        const index = recipes.findIndex(r => r.name === recipeName);
        if (index !== -1) {
            recipe = recipes[index];
        }
        
        if (recipe) {
          const id = recipe.id 
          const endpoint = "http://127.0.0.1:8000/recipes/" + id
          
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
                    recipes.splice(index, 1)
                    localStorage.setItem("recipes", JSON.stringify(recipes))
                    renderManageRecipes();
                }
                else {
                    console.error(`Failed to delete recipe "${recipeName}". Server returned status: ${response.status}`);
                    alert(`Failed to delete recipe. Server error: ${response.status}`);
                }

            } 
            catch(error) {
                console.error(`Network error while deleting recipe "${recipeName}":`, error.message);
                alert(`Failed to connect to server. Please check your internet connection and try again.\nError: ${error.message}`);
            }

        }
    }
}

function editRecipe(recipeName) {
    const recipe = recipes.find(r => r.name === recipeName);
    if (recipe && recipe.id) {

        localStorage.setItem('editRecipe', recipeName);
        localStorage.setItem('editRecipeId', recipe.id);
        window.location.href = 'edit_recipe.html?id=' + recipe.id;
    } else {
        alert('Cannot edit recipe: Missing recipe ID');
    }
}