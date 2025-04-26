function addRecipe() {
    event.preventDefault();
    if (!validateRecipeForm()) {
        return;
    }

    const newRecipe = {
        name: document.getElementById("add-recipe-name").value,
        image: document.getElementById("add-recipe-image").value,
        description: document.getElementById("add-recipe-description").value,
        time: document.getElementById("add-cook-time").value,
        servings: document.getElementById("add-recipe-servings").value,
        categories: [document.getElementById("add-recipe-category").value],
        cuisine: document.getElementById("add-recipe-cuisine").value,
        diet: [],
        badge: "new",
        rating: 0,
        ratingCount: 0,
        tags: getTags(),
        ingredients: getIngredients(),
        instructions: document.getElementById("add-recipe-instructions").value
    }

    function getTags() {
        const tags = [];
    
        tagsString = document.getElementById("add-recipe-tags").value;
        tagsString = tagsString.replace(/\s/g, '');
        tagsString = tagsString.split(",");
    
        for (let i = 0; i < tagsString.length; i++) {
            tags.push(tagsString[i]);
        }
        return tags;
    }


    function getIngredients() {
        const ingredients = [];

        ingredientsInputs = document.querySelectorAll(".ingredient-name-input");
        for (let i = 0; i < ingredientsInputs.length; i++) {
            ingredients.push(ingredientsInputs[i].value);
        }
        return ingredients;
    }

    const allRecipes = JSON.parse(localStorage.getItem("recipes"))
    allRecipes.push(newRecipe);

    localStorage.setItem("recipes", JSON.stringify(allRecipes));
    alert("Recipe added successfully!");
    console.log("added");
}




function validateRecipeForm() {
    
    const requiredFields = [
        { id: "add-recipe-name", name: "Recipe Name" },
        { id: "add-recipe-description", name: "Description" },
        { id: "add-cook-time", name: "Cook Time" },
        { id: "add-recipe-servings", name: "Servings" },
        { id: "add-recipe-category", name: "Category" },
        { id: "add-recipe-instructions", name: "Instructions" }
    ];
    
    let isValid = true;
    let errorMessage = "Please fill in the following required fields:\n";
    
    
    for (const field of requiredFields) {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errorMessage += `- ${field.name}\n`;
            isValid = false;
        }
    }
    
    
    const ingredients = document.querySelectorAll(".ingredient-name-input");
    if (ingredients.length === 0 || !ingredients[0].value.trim()) {
        errorMessage += "- At least one ingredient\n";
        isValid = false;
    }
    
    
    if (!isValid) {
        alert(errorMessage);
    }
    
    return isValid;
}