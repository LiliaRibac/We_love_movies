const router = require('express').Router();
const controller = require('./movies.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/:movieId/theaters').get(controller.readTheatersMovies);
router.route('/:movieId/reviews').get(controller.readReviewsMovies);

router.route('/:movieId').get(controller.read).all(methodNotAllowed);
router.route('/').get(controller.list).all(methodNotAllowed);

module.exports = router;
