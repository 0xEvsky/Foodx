//#region 
const recipesEndpoint     =     "http://127.0.0.1:8000/recipes"
const ingredientsEndpoint =     "http://127.0.0.1:8000/ingredients"
const tagsEndpoint        =     "http://127.0.0.1:8000/tags/";
const categoriesEndpoint  =     "http://127.0.0.1:8000/categories/";
const usersEndpoint       =     "http://127.0.0.1:8000/users/"
//#endregion


export async function getRecipesAPI() {
    try {
      const response = await fetch(recipesEndpoint);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const InitialRecipesData = await response.json();
      console.log("Recipes data loaded successfully:");
      return InitialRecipesData;
    } 
    catch (error) {
      console.error(error.message);
    }
}


export async function getIngredientsAPI() {
    try {
      const response = await fetch(ingredientsEndpoint);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const ingredientsData = await response.json();
      console.log("Ingredients data loaded successfully:");
      return ingredientsData;
    }
    catch (error) {
      console.error(error.message);
    }
}


export async function getTagsAPI() {
    
    try {
        const response = await fetch(tagsEndpoint);
        if (!response.ok) {
            throw new Error(`Failed to fetch tags. Status: ${response.status}`);
        }
        const tagsData = await response.json();
        console.log("Tags data loaded successfully:");
        return tagsData;
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
}



export async function getCategoriesAPI() {
    try {
        const response = await fetch(categoriesEndpoint);
        if (!response.ok) {
            throw new Error(`Failed to fetch categories. Status: ${response.status}`);
        }
        const categoriesData = await response.json();
        console.log("Categories data loaded successfully:");
        return categoriesData;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}



export async function getUsersAPI() {
  try {
    const response = await fetch(usersEndpoint)
    if (!response.ok) {
      throw new Error(`Bad response. Status: ${response.status}`);
    }
    const usersData = await response.json()
    console.log("Users data fetched successfully")
    return usersData
  } 
  catch (error) {
    console.error(`Error fetching users:`, error)
  }
}