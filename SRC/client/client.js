
function getUsers(){
    fetch('/api/getUsers', {
        method: 'GET',
        headers: {'Content-type': 'application/json'}
    })
    .then(res => {
        if (res.ok) {
            res.json()
            .then(data => displayUsers(data))       //Calling to display all of the lists
            .catch(err => console.log('Failed to get json object'))
        }
        else {
            console.log('Error: ', res.status)
        }        
    })
    .catch();
}

var showSearchResults = [];

function displayUsers(users){

    showSearchResults = [];


    users = [                                                   //remove this later
        {username: 'John', password: 'Highway 71'},
        {username: 'Peter', password: 'Lowstreet 4'},
        {username: 'Amy', password: 'Apple st 652'},
        {username: 'Hannah', password: 'Mountain 21'}];

    x = document.getElementById('getUsers');      //Showing the div area
    x.style.display = 'block';

    var resultArea = document.getElementById("userResults");       //Clearing out search results
    resultArea.innerHTML = '';


    for (var i= 0; i < users.length; i++){        //Ading all of the results to the current html
        var listItem = document.createElement("li");

        listItem.innerHTML = `<p>${users[i].username} <span>${users[i].password}</span></p>`;

        showSearchResults.push(listItem);
    }

    for (var i = 0; i< showSearchResults.length; i++){
        resultArea.appendChild(showSearchResults[i]);
    }
}


function hideUserResults(){
    x = document.getElementById('getUsers');      //Showing the div area
    x.style.display = 'none';

    x = document.getElementById("userResults");
    x.innerHTML= '';
}


function hideRecipeRatingsResults(){
    x = document.getElementById('getUsersHighestRecipes');      //Showing the div area
    x.style.display = 'none';

    x = document.getElementById(userResults);
    x.innerHTML= '';
}



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
