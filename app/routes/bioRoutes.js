"use strict"
let router = require('express').Router();
let Controller = rootRequire('app/controllers/bioController');

router.get('/user/profile',Controller.index.get);
router.get('/user/profile/settings',Controller.settings.get);

router.post('/user/profile',Controller.index.post);

module.exports = router;
