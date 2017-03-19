const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');
const uuid = require( 'uuid' );

const app = express();
const bodyParser = require( 'body-parser');


// Require the driver.
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgresql://root@localhost:26257?sslmode=disable';
var client = new pg.Client(connectionString);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use( bodyParser());

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

app.get('/api/food', (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(`
    select ${COLUMNS.join(', ')} from entries
    where description like '%${param}%'
    limit 100
  `);

  if (r[0]) {
    res.json(
      r[0].values.map((entry) => {
        const e = {};
        COLUMNS.forEach((c, idx) => {
          // combine fat columns
          if (c.match(/^fa_/)) {
            e.fat_g = e.fat_g || 0.0;
            e.fat_g = (
              parseFloat(e.fat_g, 10) + parseFloat(entry[idx], 10)
            ).toFixed(2);
          } else {
            e[c] = entry[idx];
          }
        });
        return e;
      }),
    );
  } else {
    res.json([]);
  }
});

app.post( '/logIn', function( req, res ){

    const username = req.body.username;
    const password = req.body.password;

    pg.connect( config, function( err, client, done ){

        var query = client.query( `SELECT * FROM healthi.user where username='${username}';` );

        query.on( 'error', ( err )=>{

            return res.status( 500 ).json( { success: false, statusText: 'application error' } );

        });

        let user;

        query.on( 'row', ( row )=>{

            user = row;

        } );

        query.on( 'end', ()=>{

            if( !user ){

                return res.status( 500 ).json( { success: false, statusText: 'user does not exist' } );
            }

            console.log( user.password );
            console.log( password );
            if( user.password === password ){

                return res.status(200).json({ success: true, statusText: 'successfully logged in', user: user } );
            } else {

                return res.status(500).json({ success: false, statusText: 'password incorrect'} );
            }

        } )
    })

});

app.post( '/sign-up', function( req, res ){


    const id = uuid.v4();
    const username = req.body.username;
    const password = req.body.password;

    pg.connect( config, function( err, client, done ){

       var query = client.query( `INSERT INTO healthi.user VALUES ('${id}','${username}','${password}', null, null, null, null);`);

       query.on( 'error',( err )=>{

           console.log( err );

           if( err.code === '23505' )
            return res.status(500).json( { success: false, statusText: 'username taken' } );
           else
            return res.status(500).json( { success: false, statusText: 'application error'})

           } );

       let retVal;

      query.on('row', (row)=>{

           retVal = row;
       });

      query.on('end',()=>{

            res.status( 200 ).json({ success: true, user: retVal ? retVal : { id, username, password } });
        })

    });
    }
/*    console.log( JSON.stringify( req.body ));
        return res.status(400).json({success: true, data: 'hello'}).send();*/

);

//USER
//posting each preference for food on SIGNUP for USER
//save things as JSON object, which we can stringify and SAVE in table, then when retrieved
//it can be turned back into a json object
app.post('/preferences', function(req, res){
    try{
        // Grab data from http request
        var faveCuisine = JSON.stringify(req.body.faveCuisine);
        var dietRestriction = JSON.stringify(req.body.dietRestriction);
        var dietGoals = JSON.stringify(req.body.dietGoals);
        let userId = req.headers.user.userId;

        // Get a Postgres client from the connection pool
        pg.connect( config, function( err, client, done ){
            var query = client.query( `UPDATE healthi.user SET faveCuisine = '${faveCuisine}', dietRestriction = '${dietRestriction}',
                                                              dietGoals = '${dietGoals}' WHERE id = '${userId}'`);
            query.on( 'error',( err )=>{
                console.log( err );
                if( err )
                    return res.status(500).json({ success: false, statusText: err } );
            });
            let retVal;
            query.on('row', (row)=>{
                retVal = row;
            });
            query.on('end',()=>{
                res.status( 200 ).json({ success: true, data: retVal ? retVal : {} });
            })
        });
    } catch (ex) {
        callback(ex);
    }
});



app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
