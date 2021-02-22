const { before } = require('lodash');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const blogs = require('./blog_list');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = blogs.map((b) => Blog(b));
  const promiseArray = blogObjects.map((b) => b.save());
  await Promise.all(promiseArray);
});

describe('when the database contains some blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(6);
  });

  test('the first blog is by Michael Chan', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body[0].author).toBe('Michael Chan');
  });

  test('blogs contain id', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body[0].id).toBeDefined();
  });
});

afterAll(() => mongoose.connection.close());
