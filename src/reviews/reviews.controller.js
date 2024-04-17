const reviewsService = require('./reviews.service.js');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary.js');

async function reviewsExists(req, res, next) {
  const { reviewId } = req.params;

  const existReview = await reviewsService.read(reviewId);

  if (existReview) {
    res.locals.review = existReview;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function destroy(req, res) {
  const reviewId = req.params.reviewId;
  await reviewsService.delete(reviewId);
  res.sendStatus(204);
}

module.exports = {
  delete: [asyncErrorBoundary(reviewsExists), asyncErrorBoundary(destroy)],
};
