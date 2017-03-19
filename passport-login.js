// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var config = {
    user: 'maxroach',
    host: 'localhost',
    database: 'healthi',
    port: 26257
};

// Require the driver.
var pg = require('pg');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        connection.query("select * from users where id = " + id, function (err, rows) {
            done(err, rows[0]);
        });
    });


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            console.log("Im here");
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            pg.connect(config, function (err, client, done) {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({success: false, data: err});
                }

                client.query("INSERT INTO user ( username, password ) values ('" + username + "','" + password + "')");


                let user;

                query.on('row', (row) => {

                    user = row;

                });
                query.on('end', () => {

                    res.send(user);

                });

                query.on('error', (err,) => {

                    res.status(500).json({success: false, data: err});

                });
            });
        }));
};

/*
 // =========================================================================
 // LOCAL LOGIN =============================================================
 // =========================================================================
 // we are using named strategies since we have one for login and one for signup
 // by default, if there was no name, it would just be called 'local'

 passport.use('local-login', new LocalStrategy({
 // by default, local strategy uses username and password, we will override with email
 usernameField : 'email',
 passwordField : 'password',
 passReqToCallback : true // allows us to pass back the entire request to the callback
 },
 function(req, email, password, done) { // callback with email and password from our form

 connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
 if (err)
 return done(err);
 if (!rows.length) {
 return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
 }

 // if the user is found but the password is wrong
 if (!( rows[0].password == password))
 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

 // all is well, return successful user
 return done(null, rows[0]);

 });



 }));

 };*/