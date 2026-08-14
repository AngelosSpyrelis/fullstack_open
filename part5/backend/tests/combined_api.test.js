const { test, describe, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/users');
const Blog = require('../models/blogs');
const assert = require('node:assert');
const api = supertest(app);


beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
});

describe('User creation and log-in', () => {
    test('When you log in with the righ')
});