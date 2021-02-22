const { before } = require('lodash');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blog = require('../models/blog');
const Blog = require('../models/blog');
const blogs = require('./blog_list');

const api = supertest(app);

const getSavedBlogs = async () => {
  const data = await Blog.find({});
  return data.map((b) => b.toJSON());
};

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
    expect(res.body).toHaveLength(blogs.length);
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

describe('creating a new blog', () => {
  test('works with valid data', async () => {
    const blog = {
      title: 'JavaScript testing tutorial',
      author: 'John Jest',
      url: 'http://example.com/jest-tut',
      likes: 57,
    };
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const savedBlogs = await getSavedBlogs();
    expect(savedBlogs).toHaveLength(blogs.length + 1);
    expect(savedBlogs.map((b) => b.author)).toContain('John Jest');
    expect(savedBlogs[savedBlogs.length - 1].likes).toBe(57);
  });

  test('sets likes to 0 by default', async () => {
    const blog = {
      title: 'JavaScript testing tutorial',
      author: 'John Jest',
      url: 'http://example.com/jest-tut',
    };
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const savedBlogs = await getSavedBlogs();
    expect(savedBlogs).toHaveLength(blogs.length + 1);
    expect(savedBlogs[savedBlogs.length - 1].likes).toBe(0);
  });

  test('fails with 400 if data is invalid', async () => {
    const blog = { author: 'John Jest' };
    await api.post('/api/blogs').send(blog).expect(400);
    const savedBlogs = await getSavedBlogs();
    expect(savedBlogs).toHaveLength(blogs.length);
  });
});

describe('deleting a blog', () => {
  test('works with 204 if data is valid', async () => {
    const blogsAtStart = await getSavedBlogs();
    const deletedBlog = blogsAtStart[0];
    await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204);
    const blogsAtEnd = await getSavedBlogs();
    expect(blogsAtEnd).toHaveLength(blogs.length - 1);
    expect(blogsAtEnd.map((b) => b.title)).not.toContain('React patterns');
  });
});

describe('updating a blog', () => {
  test('works and returns the updated item', async () => {
    const blogsAtStart = await getSavedBlogs();
    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send({ likes: 99 })
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const blogsAtEnd = await getSavedBlogs();
    expect(blogsAtEnd[0].likes).toBe(99);
  });
});

afterAll(() => mongoose.connection.close());
