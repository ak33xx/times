"use strict"
let router = require('express').Router();
let Controller = rootRequire('app/controllers/aboutController');
router.get('/about.ejs/', Controller.index.get);
module.exports=router;
