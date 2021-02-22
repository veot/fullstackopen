const listHelper = require('../utils/list_helper');
const blogs = require('./blog_list');

test('dummy returns one', () => {
  expect(listHelper.dummy(blogs)).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
  test("of list with one item equals its' likes", () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(7);
  });
  test('of a bigger list equals their combined likes', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null);
  });
  test('of list with one item is the item', () => {
    expect(listHelper.favoriteBlog([blogs[0]])).toEqual(blogs[0]);
  });
  test('of a bigger list is one with most likes', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});

describe('author with most blogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toEqual(null);
  });
  test("of list with one item is the items' author", () => {
    const expected = { author: 'Michael Chan', blogs: 1 };
    expect(listHelper.mostBlogs([blogs[0]])).toEqual(expected);
  });
  test('of a bigger list is one with most likes', () => {
    const expected = { author: 'Robert C. Martin', blogs: 3 };
    expect(listHelper.mostBlogs(blogs)).toEqual(expected);
  });
});

describe('author with most likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toEqual(null);
  });
  test("of list with one item is the items' author", () => {
    const expected = { author: 'Michael Chan', likes: 7 };
    expect(listHelper.mostLikes([blogs[0]])).toEqual(expected);
  });
  test('of a bigger list is one with most likes', () => {
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 };
    expect(listHelper.mostLikes(blogs)).toEqual(expected);
  });
});
