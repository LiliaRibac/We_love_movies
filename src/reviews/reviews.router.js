const router = require('express').Router();
const controller = require('./reviews.controller');

router.route('/:reviewId').delete(controller.delete);

module.exports = router;
