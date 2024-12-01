// Fake data
const recipes = [ 
    { recipeID: 1, name: "Spaghetti Bolognese" },
    { recipeID: 2, name: "Chicken Curry" },
    { recipeID: 3, name: "Vegetable Stir Fry" },
    { recipeID: 4, name: "Beef Stew" }
];

const ingredients = [
    { recipeID: 1, ingredient: "Garlic" },
    { recipeID: 2, ingredient: "Chicken" },
    { recipeID: 2, ingredient: "Garlic" },
    { recipeID: 3, ingredient: "Tomato" },
    { recipeID: 4, ingredient: "Beef" }
];

const authors = [
    { username: "user_10", recipeID: 1 },
    { username: "user_11", recipeID: 2 },
    { username: "user_12", recipeID: 2 },
    { username: "user_25", recipeID: 3 },
    { username: "user_30", recipeID: 4 }
];

// Function to fetch recipes by tag
function getRecipesByTag() {
    const tagID = 1; 

    displayRecipes(recipes, tagID, 'tag');
}

// Function to fetch recipes by ingredient
function getRecipesByIngredient() {
    const selectedIngredient = document.getElementById("ingredientSelect").value;

    const filteredRecipes = recipes.filter(recipe => { 
        const ingredientsForRecipe = ingredients.filter(ingredient => ingredient.recipeID === recipe.recipeID); // Find ingredients for each recipe
        const hasIngredient = ingredientsForRecipe.some(ingredient => ingredient.ingredient === selectedIngredient); // Check if the recipe contains that ingredient

        const authorsForRecipe = authors.filter(author => author.recipeID === recipe.recipeID);
        const isUserInRange = authorsForRecipe.some(author => { // Find the authors that are in the 10 to 30 range
            const userNum = parseInt(author.username.split('_')[1]);
            return userNum >= 10 && userNum <= 30;
        });

        return hasIngredient && isUserInRange;
    });

    displayRecipes(filteredRecipes, selectedIngredient, 'ingredient');
}


function displayRecipes(recipes, criterion, type) {
    const resultArea = document.getElementById("recipeResults");
    resultArea.innerHTML = ''; // Clear any previous results

    // Set the heading based on the context (tag or ingredient)
    const heading = document.getElementById('recipeHeading');
    if (type === 'tag') {
        heading.innerText = `Recipes for Tag ${criterion}`;
    } else if (type === 'ingredient') {
        heading.innerText = `Recipes with ${criterion}`;
    }

    // Loop through the recipes and create a list item for each
    recipes.forEach(recipe => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<p>Recipe Name: ${recipe.name} <br>Recipe ID: ${recipe.recipeID}</p>`;
        resultArea.appendChild(listItem);
    });

    // Show the results section
    document.getElementById('getRecipes').style.display = 'block';
}

