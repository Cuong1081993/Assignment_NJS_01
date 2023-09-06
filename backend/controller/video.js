const {
  trendingPaging,
  topRatePaging,
  genresPaging,
  searchPaging,
} = require("../util/paging");

const Video = require("../model/Video");

//convert date to string
const splitDate = (date) => {
  date = date.substr(0, 10);
  const result = {
    day: parseInt(date.split("-")[2]),
    month: parseInt(date.split("-")[1]),
    year: parseInt(date.split("-")[0]),
  };

  return result;
};

// find latest trailer

const findLatestTrailer = (list) => {
  let latestTrailer = list[0];
  list.forEach((video) => {
    const dateA = splitDate(latestTrailer.published_at);
    const dateB = splitDate(video.published_at);

    if (dateA.year > dateB.year) {
      latestTrailer = latestTrailer;
    } else if (dateA.year < dateB.year) {
      latestTrailer = video;
    } else {
      if (dateA.month > dateB.month) {
        latestTrailer = latestTrailer;
      } else if (dateA.month < dateB.month) {
        latestTrailer = video;
      } else {
        if (dateA.day > dateB.day) {
          latestTrailer = latestTrailer;
        } else {
          latestTrailer = video;
        }
      }
    }
  });
  return latestTrailer;
};

exports.postTrailer = (req, res) => {
  const movieId = req.body.id;
  if (!movieId) {
    res.status(400).send({ message: "Not found film id param" });
    return;
  }
  Video.fetchAll((videos) => {
    const movieTrailer = videos.find((video) => video.id === movieId);
    if (movieTrailer) {
      const officalYoutube = movieTrailer.videos.filter(
        (video) => video.offical === true && video.site === "Youtube"
      );
      let trailer = officalYoutube.filter((video) => video.type === "Trailer");
      if (trailer.length === 0) {
        trailer = officalYoutube.filter((video) => video.type === "Teaser");
      }
      if (trailer.length === 1) {
        trailer = trailer[0];
        res.json(trailer);
      } else {
        trailer = findLatestTrailer(trailer);
        res.json(trailer);
      }
    } else {
      res
        .status(404)
        .send({ message: `Not found trailer video for id ${movieId}` });
    }
  });
};
