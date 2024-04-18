const knex = require('../db/connection');

const mapProperties = require('../utils/map-properties');

const addCriticDetails = mapProperties({
  c_critic_id: 'critic.critic_id',
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
  c_created_at: 'critic.created_at',
  c_updated_at: 'critic.updated_at',
});
function destroy(reviewId) {
  return knex('reviews').where({ review_id: reviewId }).del();
}

function update(updateReviews) {
  return knex('reviews')
    .select('*')
    .where({ review_id: updateReviews.review_id })
    .update(updateReviews, '*');
}

function read(reviewId) {
  return knex('reviews')
    .join('critics', 'reviews.critic_id', 'critics.critic_id')
    .select('*')
    .where({ review_id: reviewId })
    .first()
    .then(addCriticDetails);
}

module.exports = {
  read,
  update,
  delete: destroy,
};
