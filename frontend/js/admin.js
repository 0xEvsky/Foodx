import { loadRecipes } from './getRecipes.js';
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


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


async function deleteRecipe(recipeName) {
    if (confirm(`Are you sure you want to delete "${recipeName}"?`)) {
        const recipe = recipes.find(r => r.name === recipeName);
        
        if (recipe) {
          const id = recipe.pk  
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
          } catch(error) {
            console.error(`couldn't request server: `, error)
          }

          // renderManageRecipes();
        }
    }
}

function editRecipe(recipeName) {
    localStorage.setItem('editRecipe', recipeName);
    window.location.href = 'edit_recipe.html';
}