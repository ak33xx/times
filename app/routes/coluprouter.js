"use strict"
let router = require('express').Router();
let Controller = rootRequire('app/controllers/columnController');

router.get('/column/upload',Controller.upload.get);  //external upload form
router.get('/column/:Id', Controller.index.get); // article

router.post('/column/:userId/upload',Controller.upload.post); //columns upload
router.get('/column/:id/approve',Controller.approve.get);    //columns approve get request
router.post('/column/:id/approve',Controller.approve.post);  // columns approve post request

module.exports = router;
"use strict"
