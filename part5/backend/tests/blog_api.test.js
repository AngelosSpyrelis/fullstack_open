const { test, describe, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs');
const assert = require('node:assert');
const blogHelper = require('./blog_test_helper');
const api = supertest(app);



beforeEach(async () => {

    await Blog.deleteMany({});
    const blogObjects = blogHelper.initialBlogs.map(blog => new Blog(blog));
    const blogPromises = blogObjects.map(blog => blog.save());

    await Promise.all(blogPromises);
});

describe('All get operations are functional', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs');
        assert.strictEqual(response.body.data.length, blogHelper.initialBlogs.length);
    });

    test('all returned blogs have a property named id', async () => {
        const response = await api.get('/api/blogs');

        const responsesWithId = response.body.data.filter(blog => Object.hasOwn(blog, 'id'));

        assert(responsesWithId.length, blogHelper.initialBlogs.length);
    });
});

describe('All post operations create a new post if it is valid.', () => {

    test('posting a new blog will increase the number of blogs by 1 and the new blog will also have a user.', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5
        };

        const savedBlog = await api.
            post('/api/blogs').
            send(newBlog).
            expect(201).
            expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');
        const filteredResponses = response.body.data.map(blog => {
            delete blog.id;
            delete blog.user;
            return JSON.stringify(blog);
        });

        assert(Object.hasOwn(savedBlog.body.data, 'user'));
        assert.strictEqual(response.body.data.length, blogHelper.initialBlogs.length+1);
        assert(filteredResponses.includes(JSON.stringify(newBlog)));
    });

    test('posting a new blog without defining a "likes" value will store the new blog with 0 likes', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        };

        const saveRes = await api.
            post('/api/blogs').
            send(newBlog).
            expect(201).
            expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');


        assert.strictEqual(response.body.data.length, blogHelper.initialBlogs.length+1);
        assert.strictEqual(saveRes.body.data.likes, 0);
    });

    test('posting a new blog without defining a "title" value will return a 400 status', async () => {
        const newBlog = {
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        };

        await api.
            post('/api/blogs').
            send(newBlog).
            expect(400).
            expect('Content-Type', /application\/json/);
    });
    test('posting a new blog without defining an "author" value will return a 400 status', async () => {
        const newBlog = {
            title: 'Test title',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        };

        await api.
            post('/api/blogs').
            send(newBlog).
            expect(400).
            expect('Content-Type', /application\/json/);
    });

});

describe('Delete requests should remove the blog requested or 404 if the blog is not found.', () => {
    test('Delete requests should return 204 if the blog exists and the number of blogs should be one less. Also, the right resource should be deleted.', async() => {
        const blogs = await api.get('/api/blogs');
        const toBeDeleted = blogs.body.data[0];

        await api.delete(`/api/blogs/${toBeDeleted.id}`).
            expect(204);

        const updatedBlogs = await api.get('/api/blogs');
        const filteredResponses = updatedBlogs.body.data.map(blog => JSON.stringify(blog));


        assert(!filteredResponses.includes(JSON.stringify(toBeDeleted)));
        assert.strictEqual(updatedBlogs.body.data.length, blogHelper.initialBlogs.length -1);
    });

    test('Delete requests should return 404 if the blog doesn\'t exist and the number of blogs should be the same.', async() => {
        const toBeDeleted = '000';

        await api.delete(`/api/blogs/${toBeDeleted}`).
            expect(404);

        const updatedBlogs = await api.get('/api/blogs');

        assert.strictEqual(updatedBlogs.body.data.length, blogHelper.initialBlogs.length);
    });
});

describe('Put requests should update the blog requested and the blog.', () => {
    test('Put requests should return 201 if the blog exists and the number of likes should be the new one.', async() => {
        const blogs = await api.get('/api/blogs');
        const toBeChanged = blogs.body.data[0];
        toBeChanged.likes += 5;
        await api.put(`/api/blogs/${toBeChanged.id}`).
            send({ likes: toBeChanged.likes }).
            expect(201);

        const updatedBlog = await api.get(`/api/blogs/${toBeChanged.id}`).expect(200).expect('Content-Type', /application\/json/);

        assert.strictEqual(updatedBlog.body.data.likes, toBeChanged.likes);
    });

    test('Put requests should return 404 if the blog doesn\'t exist', async() => {
        const toBeChanged = '000';

        await api.put(`/api/blogs/${toBeChanged}`).
            expect(404);
    });
});


after(async () => {
    await mongoose.connection.close();
});
