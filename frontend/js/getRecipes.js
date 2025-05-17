export async function getInitialRecipesData() {
  const endpoint = "http://127.0.0.1:8000/recipes";
  try {
    const response = await fetch(endpoint);
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
        const InitialRecipesData = await getInitialRecipesData();

        for (let i = 0; i < InitialRecipesData.length; ++i) 
        {
            InitialRecipesData[i].fields.pk = InitialRecipesData[i].pk
            recipesData.push(InitialRecipesData[i].fields)
        }

        localStorage.setItem("recipes", JSON.stringify(recipesData))
        console.log(recipesData)
    } 
    catch (error) {
        console.error("Failed to load initial recipes: ", error);
    }
}