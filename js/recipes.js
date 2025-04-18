const recipes = [
    "Cheese Cake",
    "Shish Tawook",
    "Macarons",
    "Salamon",
    "Fried Rice",
    "Chicken Wings",
    "chocolate cake",
    "Green Salad",
    "Ramen",
    "Sezar Salad",
    "Burrito",
    "Steak",
    "Red Sause Pasta",
    "Fettuccine",
    "Spaghetti",
    "Shrimp pasta",
    "Cherry tomato pasta",
    "Trufle parmesan pasta",
    "healthy rice",
    "burger",
    "Shrimp Noodle Soup"
]

const recipesContainer = document.getElementById("all-recipes")


function renderRecipes() 
{
    recipesContainer.innerHTML = ""
}


const search_bar_input = document.getElementById("search-input")
const search_bar_submit_button = document.getElementById("search_submit_button")
const featured_categories_section = document.getElementById("featured-categories")

search_bar_submit_button.addEventListener("click", () => 
    {
        event.preventDefault();
        renderRecipes();
        featured_categories_section.classList.add("hidden");
        console.log(1);
    })