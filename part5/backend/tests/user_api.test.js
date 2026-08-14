const { test, describe, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/users');
const userHelper = require('./user_test_helper');
const assert = require('node:assert');
const api = supertest(app);



beforeEach(async () => {

    await User.deleteMany({});
    const userObjects = userHelper.initialUsers.map(user => new User(user));
    const userPromises = userObjects.map(user => user.save());

    await Promise.all(userPromises);
});

describe('Get requests', () => {
    test('If I request all the users, I will get their allocated blogs as well.', async () => {
        const users = await api.get('/api/users/').expect(200).expect('Content-Type', /application\/json/);
        users.body.data.forEach(user => console.log(user));
    });
});

describe('User creation post requests.', () => {
    test('A normal post request should create a new user and their password should be hashed. Also, we should have one more user than we started with.', async () => {

        const userData = {
            username: 'Dummy',
            password: 'ver!Str0ngPassword'
        };
        const startingUsers = await userHelper.usersInDb();
        const user = await api.post('/api/users/sign-up').send(userData).expect(201).expect('Content-Type', /application\/json/);
        const currentUsers = await userHelper.usersInDb();

        assert.notStrictEqual(user.body.data.password, userData.password);

        assert.strictEqual(currentUsers.length, startingUsers.length+1);
    });

    test('Trying to create a user without a username should return a 400 error.', async () => {
        const noUsername = {
            password: 'ver!Str0ngPassword'
        };

        await api.post('/api/users/sign-up').send(noUsername).expect(400).expect('Content-Type', /application\/json/);

    });

    test('Trying to create a user witho a weak password should return a 400 error and the correct message.', async () => {
        const noUsername = {
            username: 'test',
            password: 'weakpsw'
        };

        const result = await api.post('/api/users/sign-up').send(noUsername).expect(400).expect('Content-Type', /application\/json/);
        assert.strictEqual(result.body.data, 'Password should be at least 8 characters long and have at least 1 lowercase ,1 uppercase letter, one special character, and one number');
    });

    test('Trying to create a user without a password should return a 400 error.', async () => {
        const noPassword = {
            username: 'Dummy'
        };
        await api.post('/api/users/sign-up').send(noPassword).expect(400).expect('Content-Type', /application\/json/);
    });

    test('If the user already exists the server should respond with 400.', async () => {

        const userData = userHelper.initialUsers[0];

        const result = await api.post('/api/users/sign-up').send(userData).expect(400).expect('Content-Type', /application\/json/);


        assert.strictEqual(result.body.data, 'Error creating user');
    });
});

after(async () => {
    await mongoose.connection.close();
});