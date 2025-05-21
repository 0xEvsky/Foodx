function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    form.addEventListener('submit', addRecipe);
});



async function addRecipe(event) {
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
        badge: "new",
        rating: 0,
        ratingCount: 0,
        tags: getTags(),
        ingredients: getIngredients(),
        instructions: document.getElementById("add-recipe-instructions").value
    }

    function getTags() {
        const tags = [];
    
        let tagsString = document.getElementById("add-recipe-tags").value;
        tagsString = tagsString.replace(/\s/g, '');
        tagsString = tagsString.split(",");
    
        for (let i = 0; i < tagsString.length; i++) {
            tags.push(tagsString[i]);
        }
        return tags;
    }


    function getIngredients() {
        const ingredients = [];

        let ingredientsInputs = document.querySelectorAll(".ingredient-name-input");
        for (let i = 0; i < ingredientsInputs.length; i++) {
            ingredients.push(ingredientsInputs[i].value);
        }
        return ingredients;
    }


    const endpoint = "http://127.0.0.1:8000/recipes/";
    const requestBody = JSON.stringify(newRecipe);

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            credentials: 'include',
            body: requestBody
        })

        if (response.status === 201) {
            const responseBody = await response.json()
            console.log(responseBody)
            newRecipe.pk = responseBody.id
            const allRecipes = JSON.parse(localStorage.getItem("recipes"));
            allRecipes.push(newRecipe);
            localStorage.setItem("recipes", JSON.stringify(allRecipes));
            alert("Recipe added successfully!");
            console.log("added");
        } else {
            console.error("Couldn't add recipe")
        }

    } catch (error) {
        console.error("Couldn't request server: ", error)
    }


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