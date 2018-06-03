"use strict"
let router = require('express').Router();
let Controller = rootRequire('app/controllers/postController');

router.get('/:user_id/:post_id',Controller.index.get);

router.get('/:user_id/:post_id/edit',Controller.edit.get);
router.post('/:user_id/:post_id/edit',Controller.edit.post);
router.post('/:user_id/:post_id/',Controller.delete.post); 

module.exports = router;