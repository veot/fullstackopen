// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, obj) => acc + obj.likes, 0);
};

const favoriteBlog = (blogs) => {
  let mostLikes = -1;
  let blogWithMostLikes = undefined;
  for (const blog of blogs) {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes;
      blogWithMostLikes = blog;
    }
  }
  return blogWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
