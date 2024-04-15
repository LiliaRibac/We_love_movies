const { move } = require('./movies.router');
const moviesService = require('./movies.service');

function list(req, res, next) {
  if (req.query.is_showing === 'true') {
    moviesService
      .list(true)
      .then((data) => res.json({ data }))
      .catch(next);
  } else {
    moviesService
      .list()
      .then((data) => res.json({ data }))
      .catch(next);
  }
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovies = await moviesService.read(movieId);

  if (foundMovies) {
    res.locals.movie = foundMovies;
    return next;
  }
  next({ status: 404, message: `Movie id is not found: ${movieId}` });
}

function read(req, res) {
  res.json({ data: res.locals.movie });
}
module.exports = {
  list,
  read: [movieExists, read],
};
