"use strict"
let router = require('express').Router();
let Controller = rootRequire('app/controllers/indexController');


router.get('/', Controller.index.get);
router.get('/index.ejs', Controller.index.get);

module.exports = router;
