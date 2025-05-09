document.addEventListener('DOMContentLoaded', function() {
    const recipeName = localStorage.getItem('editRecipe');
    
    if (!recipeName) {
        alert('No recipe selected for editing');
        window.location.href = 'admin.html';
        return;
    }
    
    let recipes = JSON.parse(localStorage.getItem('recipes')) || window.recipes || [];
    
    const recipe = recipes.find(r => r.name === recipeName);
    
    if (!recipe) {
        alert('Recipe not found');
        window.location.href = 'admin.html';
        return;
    }
    
    fillFormWithRecipeData(recipe);
    
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveRecipe(recipe, recipes);
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

function fillFormWithRecipeData(recipe) {
    document.getElementById('recipe_name').value = recipe.name;
    
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
    
    const ingredientsGroup = document.getElementById('ingredients-group');
    const ingredientItems = ingredientsGroup.querySelectorAll('.ingredient-item');
    for (let i = 1; i < ingredientItems.length; i++) {
        ingredientItems[i].remove();
    }
    
    if (recipe.ingredients && recipe.ingredients.length > 0) {
        const firstIngredientItem = ingredientsGroup.querySelector('.ingredient-item');
        const firstIngredientInputs = firstIngredientItem.querySelectorAll('input');
        firstIngredientInputs[0].value = recipe.ingredients[0];
        
        for (let i = 1; i < recipe.ingredients.length; i++) {
            addIngredientField(recipe.ingredients[i]);
        }
    }
    
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
    const name = document.getElementById('recipe_name').value;
    const courseSelect = document.getElementById('course');
    const course = courseSelect ? courseSelect.value : '';
    
    const ingredientInputs = document.querySelectorAll('input[name="ingredient_name[]"]');
    const ingredients = Array.from(ingredientInputs).map(input => input.value);
    
    const descriptionTextarea = document.getElementById('description');
    const instructions = descriptionTextarea.value.split('\n').filter(line => line.trim() !== '');
    
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
    
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    alert('Recipe updated successfully!');
    window.location.href = 'admin.html';
}