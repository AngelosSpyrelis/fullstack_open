const { test, describe, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/users');
const Blog = require('../models/blogs');
const assert = require('node:assert');
const api = supertest(app);
const helper = require('./authentication_api_test_helper');


beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await api.post('/api/users/sign-up/').send(helper.users[0]);
    await api.post('/api/users/sign-up/').send(helper.users[1]);
    const result = await api.post('/api/users/sign-in/').send(helper.users[0]);
    await api.post('/api/blogs/').send(helper.blogs[0]).set('authorization', `Bearer ${result.body.data.token}`);
});

describe('Log in', () => {
    test('Trying to log in with the right credentials will return a token that can be used later.', async () => {
        const result = await api.post('/api/users/sign-in/').send(helper.users[0]).expect(200).expect('Content-Type', /application\/json/);
        assert.notStrictEqual(result.body.data.token, null);
    });

    test('Trying to log in with the wrong password will return a 401 status and the right message.', async () => {
        const result = await api.post('/api/users/sign-in/').send({ username: helper.users[0].username, password: '5djfjvjyt77' }).expect(401).expect('Content-Type', /application\/json/);
        assert.strictEqual(result.body.data, 'invalid username or password');
    });

    test('Trying to log in with the wrong username will return a 401 status and the right message.', async () => {
        const userRes = await api.post('/api/users/sign-in/').send({ username: 'NoUser', password: '5djfjvjyt77' }).expect(401).expect('Content-Type', /application\/json/);
        assert.strictEqual(userRes.body.data, 'There is no such user.');
    });

});

describe('Blog creation with authentication check', () => {
    test('Logging in and trying to create a new blog will result in success and the blog will be linked to the user.', async () => {
        const result = await api.post('/api/users/sign-in/').send(helper.users[0]).expect(200).expect('Content-Type', /application\/json/);
        const newBlog = await api.post('/api/blogs/').send(helper.blogs[1]).set('authorization', `Bearer ${result.body.data.token}`).expect(201).expect('Content-Type', /application\/json/);
        assert.strictEqual(newBlog.body.data.user.username, helper.users[0].username);
    });

    test('Trying to create a blog without logging in will result in a 401 error', async () => {
        const newBlog = await api.post('/api/blogs/').send(helper.blogs[1]).set('authorization', 'Bearer ' ).expect(401).expect('Content-Type', /application\/json/);
        assert.strictEqual(newBlog.body.data, 'Blogs cannot be added or removed without a valid token.');
    });

    test('Trying to create a blog with the wrong token will result in a 401 error', async () => {
        const newBlog = await api.post('/api/blogs/').send(helper.blogs[1]).set('authorization', 'Bearer adwacad4584daca3588').expect(401).expect('Content-Type', /application\/json/);
        assert.strictEqual(newBlog.body.data, 'jwt malformed');
    });
});

describe('Blog deletion with authentication check', () => {
    test('Trying to delete a blog logged in as its owner will result in success', async () => {
        const result = await api.post('/api/users/sign-in/').send(helper.users[0]).expect(200).expect('Content-Type', /application\/json/);
        const blogs = await api.get('/api/blogs/');
        await api.delete('/api/blogs/').send({ id: blogs.body.data[0].id }).set('authorization', `Bearer ${result.body.data.token}`).expect(204);
    });

    test('Trying to delete a blog not logged in will result in a  401 error', async () => {
        const blogs = await api.get('/api/blogs/');
        await api.delete('/api/blogs/').send({ id: blogs.body.data[0].id }).set('authorization', 'Bearer ').expect(401);
    });

    test('Trying to delete a blog logged in as some user other than the creator will result in a 401 error', async () => {
        const result = await api.post('/api/users/sign-in/').send(helper.users[1]).expect(200).expect('Content-Type', /application\/json/);
        const blogs = await api.get('/api/blogs/');
        await api.delete('/api/blogs/').send({ id: blogs.body.data[0].id }).set('authorization', `Bearer ${result.body.data.token}`).expect(401);
    });
});

after(async () => {
    await mongoose.connection.close();
});