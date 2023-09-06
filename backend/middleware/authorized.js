const express = require("express");
const router = express.Router();
const User = require("../model/User");

router.use((req, res, next) => {
  const tokenId = req.query.token;
  if (tokenId != undefined) {
    User.fetchAll((users) => {
      const user = users.find((user) => user.token === tokenId);
      if (user) {
        next();
      } else {
        res.statusMessage = "Unauthorized";
        res.status(401).end();
      }
    });
  }
});

module.exports = router;
