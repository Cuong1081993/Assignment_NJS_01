const express = require("express");
const router = express.Router();

const movieController = require("../controller/movie");
const videoController = require("../controller/video");

router.get("/trending/", movieController.getTrendingMovies);
router.get("/top-rate/", movieController.getTopRatingMovies);
router.get("/discover", movieController.getGenreMovies);
router.get("/discover/tv", movieController.getMovieByMediaType);
router.get("/discover/:genreId", movieController.getGenreMovies);
router.get("/search", movieController.searchMovie);
router.post("/video", videoController.getTrailer);
module.exports = router;
