"use strict"
let router = require('express').Router();
let Controller = rootRequire('app/controllers/registerController');


router.get('/register', Controller.register.get);

router.post('/register', Controller.register.post);


module.exports = router;