const config = require('./utils/config');
const middleware = require('./utils/middleware');
const express = require('express');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const testRouter = require('./controllers/testing');
const mongoose = require('mongoose');
const url = config.MONGODB_URI;
const app = express();


mongoose.set('strictQuery',false);
mongoose.connect(url, { family: 4 });


app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(express.static('dist'));
app.use(middleware.requestLogger);

if(process.env.NODE_ENV === 'test'){
    app.use('/api/testing', testRouter);
}

app.use('/api/users', usersRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;