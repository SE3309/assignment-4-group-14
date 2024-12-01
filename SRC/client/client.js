
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

function addNewIngredient(){
    let ele = document.getElementById('ingredientMessage');
    ele.innerText = "" ;
    
    var foodGroup = document.getElementById('foodGroup').value;
    var ingredientName = document.getElementById('ingredientName').value;

    let goodSearch = validateSearch(foodGroup);
    if (goodSearch == false){
        return
    }

    goodSearch = validateSearch(ingredientName);
    if (goodSearch == false){
        return
    }

    let id = (Math.floor(Math.random() * 10000000000)).toString();

    newpart = {
        foodGroup: foodGroup,
        name: ingredientName,
        ingredientID: id
    }

    fetch('/api/create-ingredient', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newpart)
    })
    .then(res => {
        if (res.ok) {
            res.json()
            .then(data => {
                let ele = document.getElementById('ingredientMessage');
                ele.innerText = "Ingredient sucessfully created" ;
            })       //Calling to display all of the lists
            .catch(err => console.log('Failed to get json object'))
        }
        else {
            console.log('Error: ', res.status)
        }        
    })
    .catch();
}

function validateSearch(search){
    if ( search.length > 29){       //If the text string is longer than 20 characters
        alert("ERROR: keep search result less than 20 character");
        return false;                     //Exit function
    }
    if ( search.length == 0){       //If the text string is longer than 20 characters
        alert("ERROR: input a search");
        return false;                     //Exit function
    }
    return true;        //This means that the search result is only letters and is shorter than 21 characters
}

function searchHighestRatings(){
    var inputtedRecipe = document.getElementById('highestRecipeName').value;

    let goodSearch = validateSearch(inputtedRecipe);
    if (goodSearch == false){
        return;
    }

    newpart = {
        recipeName: inputtedRecipe
    }

    /*fetch('/api/create-ingredient', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newpart)
    })
    .then(res => {
        if (res.ok) {
            res.json()
            .then(data => {
                displayRatingUsers(data);
            })       //Calling to display all of the lists
            .catch(err => console.log('Failed to get json object'))
        }
        else {
            console.log('Error: ', res.status)
        }        
    })
    .catch();*/

    displayRatingUsers('');
}

function displayRatingUsers(users){

    showSearchResults = [];


    users = [                                                   //remove this later
        {username: 'John'},
        {username: 'Peter'},
        {username: 'Amy'},
        {username: 'Hannah'}];

    x = document.getElementById('getUsersRating');      //Showing the div area
    x.style.display = 'block';

    var resultArea = document.getElementById("userRatingResults");       //Clearing out search results
    resultArea.innerHTML = '';


    for (var i= 0; i < users.length; i++){        //Ading all of the results to the current html
        var listItem = document.createElement("li");

        listItem.innerHTML = `<p>${users[i].username}</p>`;

        showSearchResults.push(listItem);
    }

    for (var i = 0; i< showSearchResults.length; i++){
        resultArea.appendChild(showSearchResults[i]);
    }
}
