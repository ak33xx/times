"use strict"
var passport = require('passport');



module.exports = {

    index: {
        get : (req,res)=>{ res.render('login'); },

        post :  passport.authenticate('local', { successRedirect: '/user/profile',failureRedirect: '/login' })



},

}

