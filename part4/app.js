const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const app = express();

mongoose
  .connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("Error connecting to MongoDB:", err.message));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
