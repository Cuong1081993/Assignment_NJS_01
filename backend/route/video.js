const express = require("express");
const router = express.Router();
const videoController = require("../controller/video");

router.get("/video", videoController.postTrailer);

module.exports = router;
