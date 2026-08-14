const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/users');



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate({ path: 'user', select: ['username', '_id'] });
    return response.json({ success: true, data: blogs });
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate({ path: 'user', select: ['username', '_id'] });

    return response.status(200).json({ success: true, data: [blog] });
});

blogsRouter.get('/by-user/:id', async (request, response) => {
    const user = await User.findById(request.params.id);

    const blogs = await Blog.find({ user: user._id });
    return response.status(200).json({ success: true, data: blogs });
});

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);
    if(!blog.likes || typeof blog.likes !== 'number'){
        blog.likes = 0;
    }
    const result = await blog.save();
    return response.status(201).json({ success: true, data: result });
});

blogsRouter.delete('/', async (request, response, next) => {

    const blog = await Blog.findById(request.body.id);
    if(blog.user.toString() !== request.body.user._id.toString()){
        return next({ name:'AuthenticationError', message: 'Blogs cannot be deleted by anyone other than their creator.' });
    };

    await Blog.findByIdAndDelete(request.body.id);
    return response.status(204).end();
});


blogsRouter.put('/', async (request, response) => {
    delete request.body.user;
    const blog = await Blog.findById(request.body.id);
    delete request.body.id;
    for(const [key, value] of Object.entries(request.body)){
        if(key in blog){
            blog[key] = value;
        }
    }

    const result = await blog.save();
    return response.status(201).json({ success: true, data: result });
});

blogsRouter.put('/like/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id);
    blog.likes++;

    const result = await blog.save();
    return response.status(201).json({ success: true, data: result });
});


module.exports = blogsRouter;