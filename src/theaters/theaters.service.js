const knex = require('../db/connection');
const reduceProperties = require('../utils/reduce-properties');

function list() {
  return knex('theaters')
    .select('*')
    .join(
      'movies_theaters',
      'theaters.theater_id',
      'movies_theaters.theater_id'
    )
    .join('movies', 'movies_theaters.movie_id', 'movies.movie_id')
    .then(
      reduceProperties('theater_id', {
        movie_id: 'movies.movie_id',
        title: 'movies.title',
        runtime_in_minutes: 'movies.runtime_in_minutes',
        rating: 'movies.rating',
        description: 'movies.description',
        image_url: 'movies.image_url',
        created_at: 'movies.created_at',
        updated_at: 'movies.updated_at',
        is_showing: 'movies_theaters.is_showing',
      })
    );
}

module.exports = {
  list,
};
