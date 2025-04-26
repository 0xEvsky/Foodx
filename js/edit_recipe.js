document.addEventListener('DOMContentLoaded', function() {
    // Get the recipe name to edit from localStorage
    const recipeName = localStorage.getItem('editRecipe');
    
    if (!recipeName) {
        alert('No recipe selected for editing');
        window.location.href = 'admin.html';
        return;
    }
    
    // Get recipes from localStorage
    let recipes = JSON.parse(localStorage.getItem('recipes')) || window.recipes || [];
    
    // Find the recipe to edit
    const recipe = recipes.find(r => r.name === recipeName);
    
    if (!recipe) {
        alert('Recipe not found');
        window.location.href = 'admin.html';
        return;
    }
    
    // Fill the form with recipe data
    fillFormWithRecipeData(recipe);
    
    // Add event listener for form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveRecipe(recipe, recipes);
    });
    
    // Add event listener for adding ingredients
    const addIngredientBtn = document.createElement('button');
    addIngredientBtn.textContent = 'Add Ingredient';
    addIngredientBtn.className = 'add-ingredient-btn';
    addIngredientBtn.type = 'button';
    addIngredientBtn.addEventListener('click', addIngredientField);
    
    const ingredientsGroup = document.getElementById('ingredients-group');
    ingredientsGroup.appendChild(addIngredientBtn);
    
    // Add remove buttons to existing ingredient fields
    addRemoveButtonsToIngredients();
});

function fillFormWithRecipeData(recipe) {
    // Set recipe name
    document.getElementById('recipe_name').value = recipe.name;
    
    // Set course (if applicable)
    const courseSelect = document.getElementById('course');
    if (courseSelect && recipe.categories && recipe.categories.length > 0) {
        const category = recipe.categories[0];
        for (let i = 0; i < courseSelect.options.length; i++) {
            if (courseSelect.options[i].value === category) {
                courseSelect.selectedIndex = i;
                break;
            }
        }
    }
    
    // Clear existing ingredient fields
    const ingredientsGroup = document.getElementById('ingredients-group');
    const ingredientItems = ingredientsGroup.querySelectorAll('.ingredient-item');
    for (let i = 1; i < ingredientItems.length; i++) {
        ingredientItems[i].remove();
    }
    
    // Add ingredient fields for each ingredient
    if (recipe.ingredients && recipe.ingredients.length > 0) {
        // Set first ingredient
        const firstIngredientItem = ingredientsGroup.querySelector('.ingredient-item');
        const firstIngredientInputs = firstIngredientItem.querySelectorAll('input');
        firstIngredientInputs[0].value = recipe.ingredients[0];
        
        // Add remaining ingredients
        for (let i = 1; i < recipe.ingredients.length; i++) {
            addIngredientField(recipe.ingredients[i]);
        }
    }
    
    // Set description/instructions
    const descriptionTextarea = document.getElementById('description');
    if (descriptionTextarea && recipe.instructions) {
        descriptionTextarea.value = recipe.instructions.join('\n');
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
    
    // Insert before the add button
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

function saveRecipe(recipe, recipes) {
    // Get updated values from form
    const name = document.getElementById('recipe_name').value;
    const courseSelect = document.getElementById('course');
    const course = courseSelect ? courseSelect.value : '';
    
    // Get ingredients
    const ingredientInputs = document.querySelectorAll('input[name="ingredient_name[]"]');
    const ingredients = Array.from(ingredientInputs).map(input => input.value);
    
    // Get instructions
    const descriptionTextarea = document.getElementById('description');
    const instructions = descriptionTextarea.value.split('\n').filter(line => line.trim() !== '');
    
    // Update recipe object
    recipe.name = name;
    
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
    
    // Update localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    // Redirect back to admin page
    alert('Recipe updated successfully!');
    window.location.href = 'admin.html';
}