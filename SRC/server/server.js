var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "recipe_app"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


//api stuff begins
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, "..", 'client')));
const router = express.Router();
router.use(express.json());

//middleware for logging
app.use((req,res,next) => {//for all routes
    console.log(`${req.method} request for ${req.url}`)
    next();
});

// Defining /api/getUsers endpoint
app.get('/api/getUsers', (req, res) => {
    const query = 'SELECT username FROM user';

    con.query(query, (error, results) => {
        if (error) {
            console.error('Failed to fetch users from database:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        } else {
            res.status(200).json(results);
        }
    });
});

//Defining getRecipesByTag api endpoint 
//Finds all recipes with a given tag
//Will return the recipe ID 
app.get('/api/getRecipesByTag/:tag', (req, res) => {
    const { tag } = req.params;
    const query = `
        SELECT a.recipeID
        FROM recipeTags rt 
        JOIN author a 
        ON a.recipeID = rt.recipeID
        WHERE ? IN (rt.tag1, rt.tag2, rt.tag3, rt.tag4, rt.tag5);
    `;

    con.query(query, [tag], (error, results) => {
        if (error) {
            console.error('Failed to fetch recipes by tag:', error);
            res.status(500).json({ error: 'Failed to fetch recipes by tag' });
        } else {
            res.status(200).json(results);
        }
    });
});


// Starting the server on port 3000,
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});