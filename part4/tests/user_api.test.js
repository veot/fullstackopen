const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const users = require('./user_list');

const api = supertest(app);

const getSavedUsers = async () => {
  const data = await User.find({});
  return data.map((u) => u.toJSON());
};

beforeEach(async () => {
  await User.deleteMany({});
  const userObjects = users.map((u) => new User(u));
  const promiseArray = userObjects.map((u) => u.save());
  await Promise.all(promiseArray);
});

describe('creating a new user', () => {
  test('works with valid data', async () => {
    const user = {
      username: 'theFinnisher',
      name: 'Lauri',
      password: 'perkleenolkapää',
    };
    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const savedUsers = await getSavedUsers();
    expect(savedUsers).toHaveLength(users.length + 1);
    expect(savedUsers.map((u) => u.name)).toContain('Lauri');
    expect(savedUsers[users.length].password).not.toBeDefined();
    expect(savedUsers[users.length].passwordHash).not.toBeDefined();
  });
  test('fails with 400 if password is too short', async () => {
    const user = { username: 'asdf', password: 'no' };
    await api.post('/api/users').send(user).expect(400);
    const savedUsers = await getSavedUsers();
    expect(savedUsers).toHaveLength(users.length);
  });
  test('fails with 400 if username is not defined', async () => {
    const user = { password: 'fine' };
    await api.post('/api/users').send(user).expect(400);
    const savedUsers = await getSavedUsers();
    expect(savedUsers).toHaveLength(users.length);
  });
  test('fails with 400 if username is already taken', async () => {
    const user = { username: 'lbj', password: 'lamelo' };
    const res = await api.post('/api/users').send(user).expect(400);
    expect(res.body.error).toContain('unique');
    const savedUsers = await getSavedUsers();
    expect(savedUsers).toHaveLength(users.length);
  });
});

afterAll(() => mongoose.connection.close());
