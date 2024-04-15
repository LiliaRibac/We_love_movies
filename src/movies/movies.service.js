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
  return knex('movies').select('*').where({ movie_id: movieId }).first();
}
module.exports = {
  list,
  read,
};
