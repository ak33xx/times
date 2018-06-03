"use strict"
require('./utils/rootRequire')();
require('./utils/prodEnv')();

let express = require('express');
let http = require('http');
let Router = rootRequire('app/Router');
let app = express();
let server = http.createServer(app);




//*******

/**
 * MIDDLEWARE
 ********************* */
require('./config/middleware')(app, express);

app.use(function(req,res,next){
        res.locals.currentUser = req.user;
        next();

}



);



//************************************


//******************************
//  Router configuration
//*******************************

Router.forEach((route)=>{
   app.use(route.path, route.handler);

});

app.use('/images',express.static(__dirname+'assests/images'));
app.use('/js',express.static(__dirname+'assets/js'));
app.use('/css',express.static(__dirname+'assets/css'));
server.listen(process.env.PORT || 8000);
console.log('Server listening on 8000');