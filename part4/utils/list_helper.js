const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, obj) => acc + obj.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return null;
  return _.maxBy(blogs, 'likes');
};

const mostBlogs = (blogs) => {
  if (blogs.length < 1) return null;
  const [author, blogCount] = _(blogs)
    .countBy('author')
    .entries()
    .maxBy(_.last);
  return { author, blogs: blogCount };
};

const mostLikes = (blogs) => {
  if (blogs.length < 1) return null;
  const likesByAuthor = _(blogs)
    .groupBy('author')
    .mapValues((a) => _.sumBy(a, 'likes'))
    .value();
  const [author, likes] = _(likesByAuthor).entries().maxBy(_.last);
  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
