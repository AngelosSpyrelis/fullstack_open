const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/users');
const Blog = require('../models/blogs');


usersRouter.get('/', async (request, response) => {
    const results = await User.find({});

    for(let i = 0; i < results.length; i++){
        results[i].blogs = await Blog.find({ user: results[i]._id });
    }
    return response.status(200).json({ success: true, data: results });
});

usersRouter.post('/sign-in', async (request, response, next) => {
    const { username, password } = request.body;
    const user = await User.findOne({ username });

    if(!user){
        return next({ name: 'AuthenticationError', message: 'There is no such user.' });
    }
    const isAuthenticated = await bcrypt.compare(password, user.password);

    if(!isAuthenticated){
        return next({ name: 'AuthenticationError', message: 'invalid username or password' });
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
        .status(200)
        .json({ success: true, data: { token, username: user.username, name: user.name } });
});

usersRouter.post('/sign-up', async (request, response, next) => {

    const saltRounds = 10;
    const { username, password } = request.body;
    if(!username){
        return next({ name:'ValidationError', message: 'Username is required' });
    }
    if(!password){
        return next({ name:'ValidationError', message: 'Password is required' });
    }
    if(!/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%^&*()-_+]).{8,})\S$/g.test(password)){
        return next({ name:'ValidationError', message: 'Password should be at least 8 characters long and have at least 1 lowercase ,1 uppercase letter, one special character, and one number' });
    }

    //Checking for duplicates here to avoid unnecessary salting and hashing.
    const user = await User.findOne({ username : new RegExp(`^${username}$`, 'i') });
    if(user){
        return next({ name:'ValidationError', message: 'Error creating user' });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        username,
        password: hashPassword
    });

    const result = await newUser.save();
    if(process.env.NODE_ENV === 'test'){
        return response.status(201).json({ success: true, data: result });
    }
    else{
        return response.status(201).json({ success: true, data: 'User successfully created.' });
    }
});

module.exports = usersRouter;
