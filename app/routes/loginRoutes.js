"use strict"
let router = require('express').Router();
let Controller = rootRequire('app/controllers/loginController');


router.get('/login', Controller.index.get);

router.post('/login', Controller.index.post);

module.exports = router;