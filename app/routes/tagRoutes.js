let router = require('express').Router();
let Controller = rootRequire('app/controllers/tagController');


router.get('/tags', Controller.index.get);

router.post('/tags', Controller.index.post);


module.exports = router;