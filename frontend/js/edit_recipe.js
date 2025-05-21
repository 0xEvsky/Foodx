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
    
    // Add event listener for image file input
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

// Function to handle image upload and preview
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
    }
    
    // Create a FileReader to read the image
    const reader = new FileReader();    reader.onload = function(e) {
        // Display image preview
        const imagePreview = document.getElementById('image-preview');
        if (imagePreview) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            changedFields.image = e.target.result;
        }
    };
    
    // Read the image file as a data URL
    reader.readAsDataURL(file);
}

function fillFormWithRecipeData(recipe) {
    // Basic recipe details
    const nameInput = document.getElementById('recipe_name');
    nameInput.value = recipe.name;
    nameInput.addEventListener('change', () => {
        if (nameInput.value !== recipe.name) {
            changedFields.name = nameInput.value;
        } else {
            delete changedFields.name;
        }
    });

    // Description
    const descInput = document.getElementById('recipe_description');
    if (descInput && recipe.description) {
        descInput.value = recipe.description;
        descInput.addEventListener('change', () => {
            if (descInput.value !== recipe.description) {
                changedFields.description = descInput.value;
            } else {
                delete changedFields.description;
            }
        });
    }
      // Cook time
    const cookTimeInput = document.getElementById('cook_time');
    if (cookTimeInput && recipe.time) {
        cookTimeInput.value = parseInt(recipe.time);
        cookTimeInput.addEventListener('change', () => {
            if (parseInt(cookTimeInput.value) !== parseInt(recipe.time)) {
                changedFields.time = parseInt(cookTimeInput.value);
            } else {
                delete changedFields.time;
            }
        });
    }
    
    // Servings
    const servingsInput = document.getElementById('recipe_servings');
    if (servingsInput && recipe.servings) {
        servingsInput.value = recipe.servings;
        servingsInput.addEventListener('change', () => {
            if (parseInt(servingsInput.value) !== parseInt(recipe.servings)) {
                changedFields.servings = parseInt(servingsInput.value);
            } else {
                delete changedFields.servings;
            }
        });
    }
    
    // Course/Category
    const courseSelect = document.getElementById('course');
    if (courseSelect && recipe.categories && recipe.categories.length > 0) {
        const category = recipe.categories[0];
        for (let i = 0; i < courseSelect.options.length; i++) {
            if (courseSelect.options[i].value === category) {
                courseSelect.selectedIndex = i;
                break;
            }
        }
        courseSelect.addEventListener('change', () => {
            if (courseSelect.value !== category) {
                changedFields.categories = [courseSelect.value];
            } else {
                delete changedFields.categories;
            }
        });
    }
      const cuisineSelect = document.getElementById('cuisine');
    if (cuisineSelect && recipe.cuisine) {
        for (let i = 0; i < cuisineSelect.options.length; i++) {
            if (cuisineSelect.options[i].value.toLowerCase() === recipe.cuisine) {
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
      // Tags
    const tagsInput = document.getElementById('recipe_tags');
    if (tagsInput && recipe.tags) {
        const initialTags = tags.filter(tag => recipe.tags.includes(tag.pk)).map(tag => tag.name).join(', ');
        tagsInput.value = initialTags;
        tagsInput.addEventListener('change', () => {
            const currentTags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t);
            if (JSON.stringify(currentTags) !== JSON.stringify(initialTags.split(',').map(t => t.trim()).filter(t => t))) {
                changedFields.tags = currentTags;
            } else {
                delete changedFields.tags;
            }
        });
    }
    
    // Ingredients
    if (recipe.ingredients && recipe.ingredients.length > 0) {
        const ingredientsGroup = document.getElementById('ingredients-group');
        const existingIngredientItems = ingredientsGroup.querySelectorAll('.ingredient-item');
        
        // Keep the first one to populate, remove others
        for (let i = 1; i < existingIngredientItems.length; i++) {
            existingIngredientItems[i].remove();
        }
        
        // Store initial ingredients for comparison
        const initialIngredients = recipe.ingredients.map(id => {
            const ingredient = ingredients.find(ing => ing.pk == id);
            return ingredient ? ingredient.name : '';
        });
        
        // Setup ingredients change tracking
        const trackIngredientsChange = () => {
            const currentIngredients = Array.from(document.querySelectorAll('input[name="ingredient_name[]"]'))
                .map(input => input.value.trim())
                .filter(value => value);
            
            if (JSON.stringify(currentIngredients) !== JSON.stringify(initialIngredients)) {
                changedFields.ingredients = currentIngredients;
            } else {
                delete changedFields.ingredients;
            }
        };
        
        // Populate the first ingredient field
        if (existingIngredientItems.length > 0) {
            let ingredient = ingredients.find(ing => ing.pk == recipe.ingredients[0]);
            const firstIngredientInput = existingIngredientItems[0].querySelector('input[name="ingredient_name[]"]');
            if (firstIngredientInput) {
                firstIngredientInput.value = ingredient.name || '';
                firstIngredientInput.addEventListener('change', trackIngredientsChange);
            }
        }
        
        // Add additional ingredient fields for the rest
        for (let i = 1; i < recipe.ingredients.length; i++) {
            let ingredient = ingredients.find(ing => ing.pk == recipe.ingredients[i]);
            addIngredientField(ingredient.name);
        }
        
        // Add change tracking to the addIngredientField function
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
    
    // Instructions
    const descriptionTextarea = document.getElementById('description');
    if (descriptionTextarea && recipe.instructions) {
        let initialInstructions;
        if (Array.isArray(recipe.instructions)) {
            initialInstructions = recipe.instructions.join('\n');
        } else if (typeof recipe.instructions === 'string') {
            initialInstructions = recipe.instructions;
        } else {
            initialInstructions = String(recipe.instructions);
        }
        
        descriptionTextarea.value = initialInstructions;
        descriptionTextarea.addEventListener('change', () => {
            if (descriptionTextarea.value !== initialInstructions) {
                changedFields.instructions = descriptionTextarea.value;
            } else {
                delete changedFields.instructions;
            }
        });
        
        // Clean up any array notation that might be in the string
        descriptionTextarea.value = descriptionTextarea.value
            .replace(/^\[|\]$/g, '') // Remove outer brackets
            .replace(/(['"])(.*?)\1/g, '$2') // Remove quotes around instructions
            .replace(/,\s*/g, '\n'); // Replace commas with newlines
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


function saveRecipe(recipe, recipes) {
    // The changedFields object has been tracking all modifications
    // and can be used for the PATCH request
    
    // We'll still update the local storage for consistency
    // Get all the updated values from the form
    const name = document.getElementById('recipe_name').value;

    // Get image from preview or keep existing
    const imagePreview = document.getElementById('image-preview');
    const image = (imagePreview && imagePreview.style.display !== 'none')
        ? imagePreview.src
        : recipe.image;

    const description = document.getElementById('recipe_description') ? document.getElementById('recipe_description').value : recipe.description;
    const time = document.getElementById('cook_time') ? document.getElementById('cook_time').value : recipe.time;
    const servings = document.getElementById('recipe_servings') ? document.getElementById('recipe_servings').value : recipe.servings;
    const courseSelect = document.getElementById('course');
    const course = courseSelect ? courseSelect.value : '';
    // FIX: Use correct ID for cuisine
    const cuisineSelect = document.getElementById('cuisine');
    const cuisine = cuisineSelect ? cuisineSelect.value : recipe.cuisine;

    // FIX: Collect both ingredient names and quantities
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
        // Get instructions as a string
        instructions = descriptionTextarea.value;
    } else {
        instructions = recipe.instructions;
    }

    // FIX: Parse tags as comma-separated strings
    const tagsInput = document.getElementById('recipe_tags');
    let tags = [];
    if (tagsInput && tagsInput.value) {
        tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }

    // Update the recipe object
    recipe.name = name;
    recipe.image = image;
    recipe.description = description;
    recipe.time = time;
    recipe.servings = servings;
    recipe.cuisine = cuisine;
    recipe.tags = tags;

    if (recipe.categories) {
        if (recipe.categories.length > 0) {
            recipe.categories[0] = course;
        } else {
            recipe.categories.push(course);
        }
    } else {
        recipe.categories = [course];
    }

 
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Return the tracked changes for the API call
    console.log(changedFields)
    
    // Note: You should handle the alert and navigation after your API call succeeds
}