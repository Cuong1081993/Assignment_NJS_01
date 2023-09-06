const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;
const userMiddleware = require("./middleware/authorized");
const movieRouter = require("./route/movie");
const routerError = require("./route/404");

app.use(cors());
app.use(userMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/movies", movieRouter);

app.use(routerError);

app.listen(port);
