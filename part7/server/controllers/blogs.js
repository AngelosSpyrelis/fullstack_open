const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate({
        path: 'user',
        select: ['username', '_id'],
    });
    return response.json({ data: blogs });
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate({
        path: 'user',
        select: ['username', '_id'],
    });

    return response.status(200).json({ data: [blog] });
});

blogsRouter.get('/by-user/:id', async (request, response) => {
    const user = await User.findById(request.params.id);

    const blogs = await Blog.find({ user: user._id });
    return response.status(200).json({ data: blogs });
});

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);
    if (!blog.likes || typeof blog.likes !== 'number') {
        blog.likes = 0;
    }
    const result = await blog.save();
    return response.status(201).json({ data: result });
});

blogsRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() !== request.body.user._id.toString()) {
        return next({
            name: 'AuthenticationError',
            message:
                'Blogs cannot be deleted by anyone other than their creator.',
        });
    }

    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
});

blogsRouter.put('/like/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    blog.likes++;

    const result = await blog.save();
    return response.status(201).json({ data: result });
});

blogsRouter.put('/comment/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    blog.comments = [...blog.comments, request.body.comment];
    const result = await blog.save();
    return response.status(201).json({ data: result });
});

module.exports = blogsRouter;
