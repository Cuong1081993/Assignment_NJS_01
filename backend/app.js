const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

const movieRoute = require("./route/movie");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/movies", movieRoute);

app.listen(port);
