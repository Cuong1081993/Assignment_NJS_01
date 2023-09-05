const {
  trendingPaging,
  topRatePaging,
  genresPaging,
  searchPaging,
} = require("../util/paging");

const Movie = require("../model/Movie");

// get trending movies
exports.getTrendingMovies = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 20;
    const results = trendingPaging(movies, page, limit);
    res.status(200).send(results);
  });
};
// get top-rate movies

exports.getTopRatingMovies = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const genreId = +req.params.genreId;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 20;
    const results = topRatePaging(movies, page, limit, genreId);
    res.status(200).send(results);
  });
};
