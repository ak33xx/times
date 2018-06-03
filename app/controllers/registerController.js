"use strict"
var User = require('../models/user.js');
var bcrypt = require('bcrypt');




module.exports = {
    register :{
        get : (req,res)=> {

            res.render('register');

    },

    post : (req,res)=>{
            // console.log(req.body);

            var user ={

                 username : req.body.username,
                 password : req.body.password,
                 position : req.body.position.toLowerCase()
            };

            //Check if Username already exists

            User.findOne({ where: {username: user.username} }).then(usr => {
              // usr is the user with given username || null
              if (usr == null){

            // Saving User registration data to database with hashed password
            User.hashPassword(user).then((hash)=>{User.create({username:user.username, password:hash, position: user.position})

            .then((result)=>{

                var user = result.dataValues;
                // console.log(user);
                req.login(user, function(err)
                    {

                        if(err) throw err;
                        res.redirect('/');
                    }

                );

            })

            })
                .catch((err)=>console.log('error'));

              }
              else{
                res.render('error.ejs')
              }
            })






}

}

}