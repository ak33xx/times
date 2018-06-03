let router = require('express').Router();
let Controller = rootRequire('app/controllers/photo_postController');

router.get('/photo/:id', Controller.index.get);
// router.get('/photo/:userId/upload',Controller.upload.get);
router.post('/photo/:userId/upload',Controller.upload.post);
router.get('/photo/:id/approve', Controller.approve.get);
router.post('/photo/:id/approve',Controller.approve.post);

module.exports = router;