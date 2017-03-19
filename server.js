const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');

const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3');

const db = new sqlite.Database(filebuffer);

const app = express();
const pg = require('pg');

// Require the driver.
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgresql://root@localhost:26257?sslmode=disable';
var client = new pg.Client(connectionString);

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const COLUMNS = [
  'carbohydrate_g',
  'protein_g',
  'fa_sat_g',
  'fa_mono_g',
  'fa_poly_g',
  'kcal',
  'description',
];

var config = {
    user: 'maxroach',
    host: 'localhost',
    database: 'healthi',
    port: 26257
};

//FOOD
//GET food item suggestions from foodTable
app.get('/foodSuggestions', function(req, res){
    try{
        console.log( 'call food suggestions!!!!' );
        // Get a Postgres client from the connection pool
        pg.connect( config, function(err, client, done) {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err});
            }

            const foodItems = [];

            //CHANGE THE BELOW QUERY
            var query = client.query("SELECT name FROM healthi.foodItem;" );

            query.on('row', function(row) {
                foodItems.push( row );
            });

            query.on('end', function() {
                console.log( 'foodItems:', JSON.stringify( foodItems ) );
                res.send(foodItems);
            });

            query.on('error', function(err) {
                console.log(err);
                res.status(500).json({ success: false, data: err});
                done();
            });
        });
    } catch (ex) {

        console.log( ex );

    }
});

//USER LOGIN
app.post('/userPref', function(req, res){
    try{
        //ANNA PUT YOUR STUFF HERE
    } catch (ex) {
    }
});


//USER
//posting each preference for food on SIGNUP for USER
//save things as JSON object, which we can stringify and SAVE in table, then when retrieved
//it can be turned back into a json object
app.post('/userPref', function(req, res){
    try{
        // Grab data from http request
        var data = {faveCuisine: req.body.faveCuisine,
                    dietRestriction: req.body.dietRestriction,
                    dietGoals: req.body.dietGoals};
        // Get a Postgres client from the connection pool
        pg.connect(connectionString, function(err, client, done) {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err});
            }
            // Insert food preference for user
            client.query("INSERT INTO healthi.user.foodPref(name, balance) VALUES($1, $2);", [data.faveCuisine,
                                                                                      data.dietRestriction,
                                                                                      data.dietGoals], function (err, result) {
                done();
                res.send();
                if (err) {
                    return console.error('error happened during query', err)
                }
            });
        });
    } catch (ex) {
        callback(ex);
    }
});

