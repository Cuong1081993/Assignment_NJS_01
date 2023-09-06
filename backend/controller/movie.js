const {
  trendingPaging,
  topRatePaging,
  genresPaging,
  searchPaging,
} = require("../util/paging");

const Movie = require("../model/Movie");
const Video = require("../model/Video");
const GenreList = require("../data/genreList.json");

// get trending movies
exports.getTrendingMovies = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 20;
    const results = trendingPaging(movies, page, limit);
    res.send(results);
  });
};
// get top-rate movies

exports.getTopRatingMovies = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const genreId = +req.query.genreId;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 20;
    const results = topRatePaging(movies, page, limit, genreId);
    res.send(results);
  });
};

// get movies base on genreId , send error if not found

exports.getGenreMovies = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const genreId = +req.query.genreId;

    if (!genreId) {
      res.status(400).send({ message: "Not found gerne parram" });
      return;
    } else {
      const isAvailable = GenreList.find((genre) => genre.id === genreId);
      if (!isAvailable) {
        res.status(400).send({ message: "Not found that gerne id" });
        return;
      } else {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 20;
        const results = genresPaging(movies, page, limit, genreId);
        res.send(results);
      }
    }
  });
};

exports.searchMovie = (req, res, next) => {
  const query = req.query.query;
  console.log(query);
  Movie.fetchAll((movies) => {
    if (!query || query === "") {
      res.status(400).send({ message: "Not found keyword parram" });
      return;
    } else {
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = 20;
      const results = searchPaging(movies, page, limit, query);
      res.send(results);
    }
  });
};

exports.getMovieByMediaType = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const movieArr = [];
    const length = movies.length;
    for (let i = 0; i < length; i++) {
      if (movies[i].media_type === "tv") {
        movieArr.push(movies[i]);
      }
    }
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 20;
    const results = trendingPaging(movieArr, page, limit);
    res.send(results);
  });
};
