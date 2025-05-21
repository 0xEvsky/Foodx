import { loadRecipes, loadIngredients, loadTags } from './loadData.js';
import { getCookie } from './getCookie.js';


let ingredients = []
let tags = []

let changedFields = {};

document.addEventListener('DOMContentLoaded', async function() {
    const recipeName = localStorage.getItem('editRecipe');
    
    if (!recipeName) {
        alert('No recipe selected for editing');
        window.location.href = 'admin.html';
        return;
    }
    
    let recipes = []

    await loadRecipes(recipes)
    await loadIngredients(ingredients)
    await loadTags(tags)

    
    const recipe = recipes.find(r => r.name === recipeName);
    
    if (!recipe) {
        alert('Recipe not found');
        window.location.href = 'admin.html';
        return;
    }
    
    fillFormWithRecipeData(recipe);
    
    
    const imageFileInput = document.getElementById('recipe_image_file');
    if (imageFileInput) {
        imageFileInput.addEventListener('change', handleImageUpload);
    }
    
    const form = document.querySelector('form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await saveRecipe(recipe, recipes);
    });
    
    const addIngredientBtn = document.createElement('button');
    addIngredientBtn.textContent = 'Add Ingredient';
    addIngredientBtn.className = 'add-ingredient-btn';
    addIngredientBtn.type = 'button';
    addIngredientBtn.addEventListener('click', addIngredientField);
    
    const ingredientsGroup = document.getElementById('ingredients-group');
    ingredientsGroup.appendChild(addIngredientBtn);
    
    addRemoveButtonsToIngredients();
});


function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    
    if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
    }
    
    
    const reader = new FileReader();    reader.onload = function(e) {
        const imagePreview = document.getElementById('image-preview');
        if (imagePreview) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            changedFields.image = e.target.result;
        }
    };
    
    
    reader.readAsDataURL(file);
}

function fillFormWithRecipeData(recipe) {
    // Basic recipe details
    const nameInput = document.getElementById('recipe_name');
    nameInput.value = recipe.name || '';
    nameInput.addEventListener('change', () => {
        if (nameInput.value !== recipe.name) {
            changedFields.name = nameInput.value;
        } else {
            delete changedFields.name;
        }
    });

    
    const descInput = document.getElementById('recipe_description');
    if (descInput) {
        descInput.value = recipe.description || '';
        descInput.addEventListener('change', () => {
            if (descInput.value !== recipe.description) {
                changedFields.description = descInput.value;
            } else {
                delete changedFields.description;
            }
        });
    }

    
    const cookTimeInput = document.getElementById('cook_time');
    if (cookTimeInput) {
        const timeValue = recipe.time ? parseInt(recipe.time.replace(/[^0-9]/g, '')) : '';
        cookTimeInput.value = timeValue;
        cookTimeInput.addEventListener('change', () => {
            const currentTime = parseInt(cookTimeInput.value);
            const originalTime = parseInt(recipe.time.replace(/[^0-9]/g, ''));
            if (currentTime !== originalTime) {
                changedFields.time = currentTime;
            } else {
                delete changedFields.time;
            }
        });
    }
    
    
    const servingsInput = document.getElementById('recipe_servings');
    if (servingsInput) {
        servingsInput.value = recipe.servings || '';
        servingsInput.addEventListener('change', () => {
            if (parseInt(servingsInput.value) !== parseInt(recipe.servings)) {
                changedFields.servings = parseInt(servingsInput.value);
            } else {
                delete changedFields.servings;
            }
        });
    }
      
    const courseSelect = document.getElementById('course');
    if (courseSelect && recipe.categories && recipe.categories.length > 0) {
        const categoryId = recipe.categories[0];
        for (let i = 0; i < courseSelect.options.length; i++) {
            if (courseSelect.options[i].value === categoryId) {
                courseSelect.selectedIndex = i;
                break;
            }
        }
        courseSelect.addEventListener('change', () => {
            if (courseSelect.value !== categoryId) {
                changedFields.categories = [{
                    id: categoryId,
                    name: courseSelect.value
                }];
            } else {
                delete changedFields.categories;
            }
        });
    }
    
    
    const cuisineSelect = document.getElementById('cuisine');
    if (cuisineSelect && recipe.cuisine) {
        for (let i = 0; i < cuisineSelect.options.length; i++) {
            if (cuisineSelect.options[i].value.toLowerCase() === recipe.cuisine.toLowerCase()) {
                cuisineSelect.selectedIndex = i;
                break;
            }
        }
        
        cuisineSelect.addEventListener('change', () => {
            if (cuisineSelect.value.toLowerCase() !== recipe.cuisine.toLowerCase()) {
                changedFields.cuisine = cuisineSelect.value.toLowerCase();
            } else {
                delete changedFields.cuisine;
            }
        });
    }    
    const tagsInput = document.getElementById('recipe_tags');
    if (tagsInput && recipe.tags) {
        const recipeTags = recipe.tags || [];
        const tagNames = recipeTags.map(tagId => {
            const tag = tags.find(t => t.pk === tagId);
            return tag ? tag.name : '';
        }).filter(name => name);
        tagsInput.value = tagNames.join(', ');
        
        const initialTagsMap = new Map(recipeTags.map(tagId => {
            const tag = tags.find(t => t.pk === tagId);
            return tag ? [tag.name.toLowerCase(), tagId] : [null, tagId];
        }).filter(([name]) => name !== null));

        tagsInput.addEventListener('change', () => {
            const currentTagNames = tagsInput.value.split(',').map(t => t.trim()).filter(t => t);
            const changedTags = [];

            currentTagNames.forEach(tagName => {
                const initialId = initialTagsMap.get(tagName.toLowerCase());
                if (!initialId) {
                    // This is a new tag name
                    const existingTag = tags.find(t => t.name.toLowerCase() === tagName.toLowerCase());
                    if (existingTag) {
                        changedTags.push({
                            id: existingTag.pk,
                            name: tagName
                        });
                    }
                }
            });

            if (changedTags.length > 0) {
                changedFields.tags = changedTags;
            } else {
                delete changedFields.tags;
            }
        });
    }
    
    
    if (recipe.ingredients && recipe.ingredients.length > 0) {
        const ingredientsGroup = document.getElementById('ingredients-group');
        const existingIngredientItems = ingredientsGroup.querySelectorAll('.ingredient-item');
        
        
        for (let i = 1; i < existingIngredientItems.length; i++) {
            existingIngredientItems[i].remove();
        }
        
        const initialIngredients = recipe.ingredients.map(id => {
            const ingredient = ingredients.find(ing => ing.id == id);
            return ingredient ? ingredient.name : '';
        }).filter(name => name);
          
        const trackIngredientsChange = () => {
            const currentIngredients = Array.from(document.querySelectorAll('input[name="ingredient_name[]"]'))
                .map((input, index) => {
                    const ingredientName = input.value.trim();
                    const originalIngredientId = recipe.ingredients[index];
                    
                    if (ingredientName) {
                        const originalIngredient = ingredients.find(ing => ing.pk === originalIngredientId);
                        if (originalIngredient && originalIngredient.name !== ingredientName) {
                            return {
                                id: originalIngredientId,
                                name: ingredientName
                            };
                        }
                    }
                    return null;
                })
                .filter(ing => ing !== null);
            
            if (currentIngredients.length > 0) {
                changedFields.ingredients = currentIngredients;
            } else {
                delete changedFields.ingredients;
            }
        };
        

        if (existingIngredientItems.length > 0 && recipe.ingredients[0]) {
            let ingredient = ingredients.find(ing => ing.id == recipe.ingredients[0]);
            const firstIngredientInput = existingIngredientItems[0].querySelector('input[name="ingredient_name[]"]');
            if (firstIngredientInput && ingredient) {
                firstIngredientInput.value = ingredient.name;
                firstIngredientInput.addEventListener('change', trackIngredientsChange);
            }
        }
        
    
        for (let i = 1; i < recipe.ingredients.length; i++) {
            let ingredient = ingredients.find(ing => ing.id == recipe.ingredients[i]);
            if (ingredient) {
                addIngredientField(ingredient.name);
            }
        }
        
  
        const originalAddIngredient = addIngredientField;
        addIngredientField = (ingredientValue = '') => {
            const field = originalAddIngredient(ingredientValue);
            const input = field.querySelector('input[name="ingredient_name[]"]');
            if (input) {
                input.addEventListener('change', trackIngredientsChange);
            }
            return field;
        };
    }

    const descriptionTextarea = document.getElementById('description');
    if (descriptionTextarea) {
        let initialInstructions;
        if (Array.isArray(recipe.instructions)) {
            initialInstructions = recipe.instructions.join('\n');
        } else if (typeof recipe.instructions === 'string') {
            initialInstructions = recipe.instructions;
        } else {
            initialInstructions = recipe.instructions ? String(recipe.instructions) : '';
        }
        
        descriptionTextarea.value = initialInstructions;
        descriptionTextarea.addEventListener('change', () => {
            if (descriptionTextarea.value !== initialInstructions) {
                changedFields.instructions = descriptionTextarea.value;
            } else {
                delete changedFields.instructions;
            }
        });
        

        descriptionTextarea.value = descriptionTextarea.value
            .replace(/^\[|\]$/g, '') 
            .replace(/(['"])(.*?)\1/g, '$2') 
            .replace(/,\s*/g, '\n'); 
    }
}

function addIngredientField(ingredientValue = '') {
    const ingredientsGroup = document.getElementById('ingredients-group');
    const ingredientItem = document.createElement('div');
    ingredientItem.className = 'ingredient-item';
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'ingredient_name[]';
    nameInput.placeholder = 'Ingredient Name';
    nameInput.value = ingredientValue;
    nameInput.required = true;
    
    const quantityInput = document.createElement('input');
    quantityInput.type = 'text';
    quantityInput.name = 'ingredient_quantity[]';
    quantityInput.placeholder = 'Quantity (e.g., 2 cups)';
    quantityInput.value = '';
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-ingredient-btn';
    removeBtn.type = 'button';
    removeBtn.addEventListener('click', function() {
        ingredientItem.remove();
    });
    
    ingredientItem.appendChild(nameInput);
    ingredientItem.appendChild(quantityInput);
    ingredientItem.appendChild(removeBtn);
    
    const addButton = ingredientsGroup.querySelector('.add-ingredient-btn');
    ingredientsGroup.insertBefore(ingredientItem, addButton);
}


function addRemoveButtonsToIngredients() {
    const ingredientItems = document.querySelectorAll('.ingredient-item');
    ingredientItems.forEach(item => {
        if (!item.querySelector('.remove-ingredient-btn')) {
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-ingredient-btn';
            removeBtn.type = 'button';
            removeBtn.addEventListener('click', function() {
                item.remove();
            });
            item.appendChild(removeBtn);
        }
    });
}

function getTags() {
    const tags = [];
    const tagsInput = document.getElementById('recipe_tags');
    
    if (tagsInput && tagsInput.value) {
        let tagsString = tagsInput.value;
        tagsString = tagsString.replace(/\s/g, '');
        tagsString = tagsString.split(",");
        
        for (let i = 0; i < tagsString.length; i++) {
            if (tagsString[i]) {
                tags.push(tagsString[i]);
            }
        }
    }
    
    return tags;
}


async function saveRecipe(recipe, recipes) {
    const name = document.getElementById('recipe_name').value;

    
    const imagePreview = document.getElementById('image-preview');
    const image = (imagePreview && imagePreview.style.display !== 'none')
        ? imagePreview.src
        : recipe.image;

    const description = document.getElementById('recipe_description') ? document.getElementById('recipe_description').value : recipe.description;
    const time = document.getElementById('cook_time') ? document.getElementById('cook_time').value : recipe.time;
    const servings = document.getElementById('recipe_servings') ? document.getElementById('recipe_servings').value : recipe.servings;
    const courseSelect = document.getElementById('course');
    const course = courseSelect ? courseSelect.value : '';
    
    const cuisineSelect = document.getElementById('cuisine');
    const cuisine = cuisineSelect ? cuisineSelect.value : recipe.cuisine;

    
    const ingredientNameInputs = document.querySelectorAll('input[name="ingredient_name[]"]');
    const ingredientQuantityInputs = document.querySelectorAll('input[name="ingredient_quantity[]"]');
    const ingredients = [];
    for (let i = 0; i < ingredientNameInputs.length; i++) {
        const name = ingredientNameInputs[i].value.trim();
        const quantity = ingredientQuantityInputs[i] ? ingredientQuantityInputs[i].value.trim() : '';
        if (name) {
            ingredients.push({ name, quantity });
        }
    }

    const descriptionTextarea = document.getElementById('description');
    let instructions;
    if (descriptionTextarea) {
        instructions = descriptionTextarea.value;
    } else {
        instructions = recipe.instructions;
    }


    const tagsInput = document.getElementById('recipe_tags');
    let tags = [];
    if (tagsInput && tagsInput.value) {
        tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }
    

    console.log('changed fieldss: ', changedFields)


    // const endpoint = "http://127.0.0.1:8000/recipes/" + recipe.id;
    // const requestBody = JSON.stringify(changedFields);
    
    // try {
    //     const response = await fetch(endpoint, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         credentials: 'include',
    //         body: requestBody
    //     })

    //     responseBody = await response.json()

    //     if (response.status === 400) {
    //         console.error(`bad request:  ${responseBody.error}`)
    //         return
    //     }
    //     else if (response.status === 500) {
    //         console.error(`server-end error: ${responseBody.error}`)
    //         return
    //     }
        
    //     if (response.status === 200) {

    //     }
        
        
        // recipe.name = name;
        // recipe.image = image;
        // recipe.description = description;
        // recipe.time = time;
        // recipe.servings = servings;
        // recipe.cuisine = cuisine;
        // recipe.tags = tags;
    // } catch (error) {
    //     console.error('Could not request server:', error)
    // }
    

    


    // if (recipe.categories) {
    //     if (recipe.categories.length > 0) {
    //         recipe.categories[0] = course;
    //     } else {
    //         recipe.categories.push(course);
    //     }
    // } else {
    //     recipe.categories = [course];
    // }

 
    // recipe.ingredients = ingredients;
    // recipe.instructions = instructions;
    // localStorage.setItem('recipes', JSON.stringify(recipes));

}