"use strict"

let router = require('express').Router();
let Controller = rootRequire('app/controllers/blogController');
router.get('/blog.ejs/', Controller.index.get);
router.get('blog.ejs/:id',Controller.single.get);
module.exports=router;
