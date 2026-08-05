const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user');
    return response.json({ success: true, data: blogs });
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user');
    return response.status(200).json({ success: true, data: blog });
});

blogsRouter.post('/', async (request, response) => {

    const blog = new Blog(request.body);
    if(!blog.likes || typeof blog.likes !== 'number'){
        blog.likes = 0;
    }
    const result = await blog.save();
    const populatedResult = await result.populate('user');
    return response.status(201).json({ success: true, data: populatedResult });;


});

blogsRouter.delete('/', async (request, response, next) => {

    const blog = await Blog.findById(request.body.id);
    if(blog.user.toString() !== request.body.user._id.toString()){
        return next({ name:'AuthenticationError', message: 'Blogs cannot be deleted without a valid token.' });
    };

    await Blog.findByIdAndDelete(request.body.id);
    return response.status(204).end();
});

blogsRouter.put('/', async (request, response) => {
    //removing the user to avoid overwriting it unnecessarily
    delete request.body.user;
    const blog = await Blog.findById(request.body.id);
    //Removing the id
    delete request.body.id;
    for(const [key, value] of Object.entries(request.body)){
        if(key in blog){
            blog[key] = value;
        }
    }

    const result = await blog.save();
    return response.status(201).json({ success: true, data: result });
});



module.exports = blogsRouter;
