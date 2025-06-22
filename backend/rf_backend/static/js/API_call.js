//#region 
const recipesEndpoint     =     "http://127.0.0.1:8000/recipes"
const ingredientsEndpoint =     "http://127.0.0.1:8000/ingredients"
const tagsEndpoint        =     "http://127.0.0.1:8000/tags/";
const categoriesEndpoint  =     "http://127.0.0.1:8000/categories/";
const usersEndpoint       =     "http://127.0.0.1:8000/users/"
const resetPasswordEndpoint =   "http://127.0.0.1:8000/users/reset-password/"
const updatePasswordEndpoint =  "http://127.0.0.1:8000/users/update-password/"
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


export async function checkEmailExistsAPI(email) {
  console.log("Checking email:", email);
  try {
    console.log(JSON.stringify({email}))
    const response = await fetch(resetPasswordEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    console.log("Email check response:", data);
    return {
      status: response.ok ? 'success' : 'error',
      exists: data.exists,
      message: data.message
    };
  } 
  catch (error) {
    console.error(`Error checking email:`, error);
    return { status: 'error', message: error.message };
  }
}

export async function updatePasswordAPI(email, password) {
  try {
    const response = await fetch(updatePasswordEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error(`Bad response. Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Password update response:", data);
    return { status: 'success', message: data.message };
  } 
  catch (error) {
    console.error(`Error updating password:`, error);
    return { status: 'error', message: error.message };
  }
}