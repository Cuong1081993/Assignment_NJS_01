const express = require("express");
const router = express.Router();

router.use((req, res) => {
  console.log("123123");
  res.statusMessage = "Route not found";
  res.status(404).send("<h1>Page not found on the server</h1>");
});

module.exports = router;
