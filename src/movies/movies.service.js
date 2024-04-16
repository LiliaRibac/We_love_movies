const knex = require('../db/connection');

function list(isShowing) {
  if (isShowing) {
    return (
      knex('movies')
        .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
        .select('movies. *')
        //     .select(
        //           'movies.movie_id',
        //           'movies.title',
        //           'movies.runtime_in_minutes',
        //           'movies.rating',
        //           'movies.description',
        //           'movies.image_url'
        //         )
        .where({ is_showing: true })
        .groupBy('movies.movie_id')
    );
  }
  return knex('movies').select('*');
}

function read(movieId) {
  console.log(movieId);
  return knex('movies').select('*').where({ movie_id: movieId }).first();
}

function listTheatersMovies(movieId) {
  return knex('theaters')
    .join(
      'movies_theaters',
      'movies_theaters.theater_id',
      'theaters.theater_id'
    )
    .where('movies_theaters.movie_id', movieId)
    .select('*');
}
function listTheatersReviews(movieId) {
  return knex('reviews')
    .join('critics', 'critics.critic_id', 'reviews.critic_id')
    .select(
      'reviews.*',
      'critics.critic_id',
      'critics.preferred_name',
      'critics.surname',
      'critics.organization_name'
    )
    .where('reviews.movie_id', movieId);
}
module.exports = {
  list,
  read,
  listTheatersMovies,
  listTheatersReviews,
};
