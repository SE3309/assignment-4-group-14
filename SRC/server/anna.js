//db
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



//routes
router.post('/create-ingredient', (req,res) => {
    const { ingredientID, foodGroup, name } = req.body;
    console.log(req.body);

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
        console.log('ingredient inserted:,' );
        res.status(201).json({ message: 'Ingredient created successfully', data: { ingredientID, foodGroup, name } });
    });

});
app.use('/api', router);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
module.exports = router;