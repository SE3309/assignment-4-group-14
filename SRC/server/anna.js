//db
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: ""
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



//routes
router.post('/create-ingredient', (req,res) => {
    const { ingredientID, foodGroup, name } = req.body;

    if (!ingredientID || !foodGroup || !name) {
        if (!ingredientID) console.log('no id');
        if (!foodGroup) console.log('no food group');
        if (!name) console.log('no name');
        return res.status(400).json({ error: 'All fields (ingredientID, foodGroup, name) are required' });
    }

    const query = `INSERT INTO ingredients (ingredientID, foodGroup, name) VALUES (?, ?, ?)`;

    con.query(query, [ingredientID, foodGroup, name], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        console.log('ingredient inserted:,', ingredientID );
        res.status(201).json({ message: 'Ingredient created successfully', data: { ingredientID, foodGroup, name } });
    });

});

router.get('/get-highest-rated-users/:recipeName', (req,res) => {
    let recipeName = req.params.recipeName;
    
    const query = `
        SELECT username 
        FROM ratings rt 
        WHERE rt.recipeID = (
            SELECT recipeID 
            FROM recipes 
            WHERE name LIKE ?
        )
        AND rating = 5
    `;
    con.query(query, [recipeName], (err, result) => {
        console.log('query');
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.status(200).json(result);
    });
});


router.get('/getUsers', (req, res) => {
    console.log('inside');


    const query = 'SELECT username FROM user';

    con.query(query, (error, results) => {
        if (error) {
            console.error('Failed to fetch users from database:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        } else {
            console.log(results);
            res.status(200).json(results);
        }
    });
});

router.get('/getRecipesByIngredientNameAndUserRange/:ingredientName/:startUser/:endUser', (req, res) => {
    const { ingredientName, startUser, endUser } = req.params;

    const query = `
        SELECT a.recipeID
        FROM recipeIngredients ri
        JOIN author a ON a.recipeID = ri.recipeID
        WHERE ri.ingredientID = (
            SELECT ingredientID 
            FROM ingredients 
            WHERE name = ?
        )
        AND a.username > ? AND a.username < ?;
    `;

    con.query(query, [ingredientName, startUser, endUser], (error, results) => {
        if (error) {
            console.error('Failed to fetch recipes by ingredient name and user range:', error);
            res.status(500).json({ error: 'Failed to fetch recipes' });
        } else {
            res.status(200).json(results);
        }
    });
});

router.get('/search-ingredients/:column/:input', (req, res) => {//where column is either name or foodGroup and input is the query string
    const input = req.params.input;
    const column = req.params.column;

    const query = `SELECT * FROM ingredients WHERE ${column} LIKE '%${input}%'`

    con.query(query, (err,results) => {
        if (err) {
            console.error('Error executing query: ', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.status(200).json(results);
    });
});

router.get('/search-recipes/:recipeName', (req,res) => {
    const recipeName = req.params.recipeName;

    const query = `SELECT * FROM recipes WHERE name LIKE '%${recipeName}%'`;

    con.query(query, (err,results) => {
        if (err) {
            console.error('Error executing query: ',err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.status(200).json(results);
    });
});

router.get('/search-tags/:tag', (req,res) => {
    const tag = req.params.tag;

    const query = `SELECT * FROM tags WHERE name LIKE '%${tag}%'`;

    con.query(query, (err,results) => {
        if (err) {
            console.error('Error executing query: ',err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.status(200).json(results);
    });
});

router.get('/search-recipes-by-tag/:tag', (req,res) => {

});


app.use('/api', router);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


module.exports = router;