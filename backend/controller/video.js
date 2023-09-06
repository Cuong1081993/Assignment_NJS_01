const Video = require("../model/Video");

exports.getTrailer = (req, res, next) => {
  Video.fetchAll((video) => {
    const filmId = req.body.query;
    console.log(filmId);

    if (!filmId) {
      res.status(400).send({ message: "Not found filmId params" });
      return;
    } else {
      const found = video.filter((video) => video.id === filmId)[0];
      if (!found) {
        res.status(400).send({ message: "Not found video" });

        return;
      } else {
        const isSuitable = found.videos.filter((vid) => {
          if (vid.official && vid.site === "YouTube") {
            if (vid.type === "Trailer") {
              return vid;
            } else {
              if (vid.type === "Teaser") {
                return vid;
              }
            }
          }
        });
        if (isSuitable !== []) {
          const latestPublishedDate = new Date(
            Math.max(...isSuitable.map((e) => new Date(e.published_at)))
          ).toISOString();
          const latestTrailer = isSuitable.filter(
            (s) => s.published_at === latestPublishedDate
          );
          console.log(latestTrailer);
          res.statusCode = 200;
          res.send(latestTrailer);
        } else {
          res.status(400).send({ message: "Not found video" });
          return;
        }
      }
    }
  });
};
