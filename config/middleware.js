"use strict"
let bodyParser     = require('body-parser');
let methodOverride = require('method-override');
let path           = require('path');
let session        = require('express-session');
let compression    = require('compression');
let passport       = require('passport');
let LocalStrategy  = require('passport-local');
let User           = require('../app/models/user.js');
let bcrypt         = require('bcrypt');


module.exports = function(app, express) {

    if (global.PROD_ENV) {
        app.use(compression());
    }

    /*
    * Parse JSON
    * app.use(bodyParser.json());
    **/

    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    /*
    * Use PUT / DELETE HTTP verb
    * app.use(methodOverride());
    **/

    app.use(session({
        secret: 'sUperS3cr3t',
        saveUninitialized: false,
        resave: true,
    }));
//*****************************************
//      Passport configuration
// ****************************************

    app.use(passport.initialize());
    app.use(passport.session());


    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({where :{username:username}})
                .then((result)=>{

                if(!result){console.log('Username does not  exit'); done(null,false);}

                var hash = result.dataValues.password;

                bcrypt.compare(password,hash,function(err,res)
                    {

                        if(err) throw err;

                        if(!res)
                        {
                            done(null,res);
                        }
                        else {
                            done(null, result);
                        }
                    }

                );


            });



        }
    ));


    passport.serializeUser(function(user, done) {

        done(null, user);
    });

    passport.deserializeUser(function(user, done) {

        done(null,user);

    });


//*************************************
    app.use(function(req, res, next){
        res.locals.currentUser    = req.user;
        next();
    });


    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, '../assets')));
};