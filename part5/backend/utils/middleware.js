const jwt = require('jsonwebtoken');
const User = require('../models/users');
const logger = require('./logger');

const requestLogger = (request, response, next) => {
    logger.info('auth:', request.get('authorization'));
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};

const tokenExtractor = (request, response, next) => {

    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(authorization.replace('Bearer ', ''), process.env.SECRET);
        request.body.decodedToken = decodedToken;
    }

    return next();
};

const userExtractor = async (request, response, next) => {
    if(request.method === 'GET'){
        return next();
    }

    if(!request.body.decodedToken || !request.body.decodedToken.id){
        return next({ name: 'JsonWebTokenError', message: 'Blogs cannot be added or removed without a valid token.' });
    }

    const user = await User.findById(request.body.decodedToken.id);

    if(user.username !== request.body.decodedToken.username){
        return next({ name: 'AuthenticationError', message: 'Blogs cannot be added or removed without a valid token.' });
    }
    request.body.user = user;
    delete request.body.decodedToken;

    return next();
};


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {

    switch(error.name){
        case 'ValidationError': return response.status(400).json({ success: false, data: error.message });
        case 'CastError': return response.status(404).json({ success: false, data: 'Resource not found' } );
        case 'AuthenticationError': return response.status(401).json({ success: false, data: error.message });
        case 'JsonWebTokenError': return response.status(401).json({ success: false, data: error.message });
        default : return response.status(500).json({ success: false, data: 'Server error' });
    }
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
};