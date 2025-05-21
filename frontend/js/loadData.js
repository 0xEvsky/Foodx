import { getIngredientsAPI, getRecipesAPI, getTagsAPI, getCategoriesAPI } from "./API_call.js"


export async function loadRecipes(recipesData) {
    const cachedRecipes = localStorage.getItem("recipes")
    if (cachedRecipes) {
        const parsed = JSON.parse(cachedRecipes)
        recipesData.push(...parsed)
        console.log("Loaded from cache")
        console.log(`cached recipes:`, recipesData)
        return
    }


    try {
        const InitialRecipesData = await getRecipesAPI()

        if (InitialRecipesData) {
            recipesData.length = 0
            for (let i = 0; i < InitialRecipesData.length; ++i) 
            {
                InitialRecipesData[i].fields.pk = InitialRecipesData[i].pk  // add id or pk field to recipe
                recipesData.push(InitialRecipesData[i].fields)
            }
        }

        localStorage.setItem("recipes", JSON.stringify(recipesData))
        console.log('Recipes loaded from server:', recipesData)
    } 
    catch (error) {
        console.error("Failed to load initial recipes: ", error);
    }
}


export async function loadIngredients(ingredientsData) {
    const cachedIngredients = localStorage.getItem("ingredients")
    if (cachedIngredients) {
        const parsed = JSON.parse(cachedIngredients)
        ingredientsData.push(...parsed)
        console.log('Ingredients loaded from cache: ', ingredientsData)
        return
    }

    try {
        const data = await getIngredientsAPI()

        if (data) {
            ingredientsData.length = 0
            for (let i = 0; i < data.length; ++i) {
                data[i].fields.pk = data[i].pk        // add id or pk field to recipe
                ingredientsData.push(data[i].fields)
            }
        }

        localStorage.setItem("ingredients", JSON.stringify(ingredientsData))
        console.log('Ingredients loaded from server:', ingredientsData)
    }
    catch (error) {
        console.error('error occured:', error)
    }
}


export async function loadTags(tagsData) {
    const cachedTags = localStorage.getItem("tags")
    if (cachedTags) {
        const parsed = JSON.parse(cachedTags)
        tagsData.push(...parsed)
        console.log('Tags loaded from cache: ', tagsData)
        return
    }

    try {
        const data = await getTagsAPI()

        if (data) {
            tagsData.length = 0 
            for (let i = 0; i < data.length; ++i) {
                data[i].fields.pk = data[i].pk        // add id or pk field to tag
                tagsData.push(data[i].fields)
            }
        }

        localStorage.setItem("tags", JSON.stringify(tagsData))
        console.log('Tags loaded from server:', tagsData)
    }
    catch (error) {
        console.error('error occurred:', error)
    }
}

export async function loadCategories(categoriesData) {
    const cachedCategories = localStorage.getItem("categories")
    if (cachedCategories) {
        const parsed = JSON.parse(cachedCategories)
        categoriesData.push(...parsed)
        console.log('Categories loaded from cache: ', categoriesData)
        return
    }

    try {
        const data = await getCategoriesAPI()

        if (data) {
            categoriesData.length = 0 
            for (let i = 0; i < data.length; ++i) {
                data[i].fields.pk = data[i].pk        // add id or pk field to category
                categoriesData.push(data[i].fields)
            }
        }

        localStorage.setItem("categories", JSON.stringify(categoriesData))
        console.log('Categories loaded from server:', categoriesData)
    }
    catch (error) {
        console.error('error occurred:', error)
    }
}





