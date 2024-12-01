
function getRecipesByTag() {
    const tagID = 1;

    const recipes = [ // Remove later
        { recipeID: 1, name: "Spaghetti Bolognese" },
        { recipeID: 2, name: "Chicken Curry" },
        { recipeID: 3, name: "Vegetable Stir Fry" },
        { recipeID: 4, name: "Beef Stew" }
    ];

    displayRecipes(recipes, tagID);
}

function displayRecipes(recipes, tagID) {
    document.getElementById('tagName').innerText = `Recipes for Tag ${tagID}`;

    const resultArea = document.getElementById("recipeResults");
    resultArea.innerHTML = '';  

    recipes.forEach(recipe => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<p>Recipe Name: ${recipe.name} <br>Recipe ID: ${recipe.recipeID}</p>`;
        resultArea.appendChild(listItem);
    });

    document.getElementById('getRecipes').style.display = 'block';
}