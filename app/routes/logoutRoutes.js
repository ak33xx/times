"use strict"
let router = require('express').Router();
let Controller = rootRequire('app/controllers/logoutController');


router.get('/logout', Controller.index.get);


module.exports = router;