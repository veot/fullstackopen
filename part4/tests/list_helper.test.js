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
  test('of empty list is undefined', () => {
    expect(listHelper.favoriteBlog([])).toEqual(undefined);
  });
  test('of list with one item is the item', () => {
    expect(listHelper.favoriteBlog([blogs[0]])).toEqual(blogs[0]);
  });
  test('of a bigger list is one with most likes', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});
