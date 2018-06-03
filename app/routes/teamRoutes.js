"use strict"

let router = require('express').Router();
let Controller = rootRequire('app/controllers/teamController');
router.get('/team.ejs/', Controller.index.get);
module.exports=router;
