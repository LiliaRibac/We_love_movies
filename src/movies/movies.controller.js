const { move } = require('./movies.router');
const moviesService = require('./movies.service');

function list(req, res, next) {
  moviesService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

async function movieExists(req, res, next) {
  //   moviesService
  //     .read(req.params.movieId)
  //     .then((foundMovie) => {
  //       if (foundMovie) {
  //         res.locals.movie = foundMovie;
  //         return next();
  //       }
  //       next({ status: 404, message: `Movie cannot be found.` });
  //     })
  //     .catch(next);

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
