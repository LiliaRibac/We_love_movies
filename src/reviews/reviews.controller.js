const reviewsService = require('./reviews.service.js');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function reviewsExists(req, res, next) {
  const { reviewId } = req.params;

  const existReview = await reviewsService.read(reviewId);

  if (existReview) {
    res.locals.review = existReview;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await reviewsService.update(updatedReview);
  res.json({ data: await reviewsService.read(updatedReview.review_id) });
}

async function destroy(req, res) {
  const reviewId = req.params.reviewId;
  await reviewsService.delete(reviewId);
  res.sendStatus(204);
}

module.exports = {
  delete: [asyncErrorBoundary(reviewsExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewsExists), asyncErrorBoundary(update)],
};
