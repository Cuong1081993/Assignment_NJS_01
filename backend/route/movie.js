const path = require("path");
const express = require("express");
const pagination = require("../util/paging");

const {
  getTrendingMovies,
  getTopRatingMovies,
} = require("../controller/movie");
const { isAuthorized } = require("../middleware/authorized");
const router = express.Router();

router.get("/trending/:token", isAuthorized, getTrendingMovies);
router.get("/top-rate/:token", isAuthorized, getTopRatingMovies);

module.exports = router;
