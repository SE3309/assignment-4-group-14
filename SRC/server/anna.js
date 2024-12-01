//db
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
<<<<<<< Updated upstream
  password: "IWillFollowYouIntoTheDark!",
  database: "assignment3"
=======
  password: "",
  database: "recipe_app"
>>>>>>> Stashed changes
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
    console.log('request received');
    let recipeName = req.params.recipeName;
    
    const query = `
        SELECT username 
        FROM ratings rt 
        WHERE rt.recipeID = (
            SELECT recipeID 
            FROM recipes 
            WHERE name = ?
        )
        AND rating = 5
    `;
    con.query(query, [recipeName], (err, result) => {
        console.log('query');
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        console.log('Query executed successfully:', result);
        res.status(200).json(result);
    });
});



app.use('/api', router);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


module.exports = router;