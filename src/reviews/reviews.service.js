const knex = require('../db/connection');

function destroy(reviewId) {
  return knex('reviews').where({ review_id: reviewId }).del();
}

function update(updateReviews) {
  return knex('reviews')
    .where({ review_id: updateReviews.review_id })
    .update(updateReviews, '*')
    .then((updatedRecords) => updatedRecords[0]);
}

function read(reviewId) {
  return knex('reviews').select('*').where({ review_id: reviewId }).first();
}

module.exports = {
  read,
  update,
  delete: destroy,
};
