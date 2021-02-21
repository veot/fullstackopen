const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", (req, res, next) => {
  Blog.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
