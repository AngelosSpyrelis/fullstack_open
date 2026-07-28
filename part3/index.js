require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/database');


const app = express();

const logger = (tokens, req, res) =>{
    
    const data = [
            ['method',tokens.method(req, res)],
            ['url',tokens.url(req, res)],
            ['status',tokens.status(req, res)],
            ['content-length',tokens.res(req, res, 'content-length')],
            ['response-time', tokens['response-time'](req, res)+'ms']
        ];
    if(data[0][1] == 'POST'){
        data.push(['body', JSON.stringify(req.body)]);
    }
    
    return data.forEach(param=>console.log(`${param[0]}: ${param[1]}`));
    
    
};

app.use(express.json());
app.use(morgan(logger));
app.use(express.static('dist'));




app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(result => {
        return response.json(result)}).catch(error=>next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(result=>{
        if(!result){
            response.status(404).end();
        }
        else{
            response.json(result);
        }
    }).catch(error=>next(error));
});

app.get('/api/info', (request, response, next) =>{
    Person.find({}).then(result => {
        const number = result.length;
        const date = new Date().toString();
        response.send(`Phonebook has infor for ${number} persons.<br />${date}`);
    }).catch(error=>next(error));
    
});

app.delete('/api/persons/:id', (request, response, next)=>{
    Person.findByIdAndDelete(request.params.id).then(result=>{
        if(!result){
            response.status(404).end();
        }
        else{
            response.status(204).end();
        }   
        
    }).catch(error=>next(error));
});

app.post('/api/persons', (request, response, next)=>{

    const person = new Person({
        name: request.body.name,
        number: request.body.number
    });
    
    person.save().then(result => response.json(resut)).catch(error=>next(error));

    
});

app.put('/api/persons/:id', (request, response, next)=>{
    
    Person.findById(request.params.id).then(person=>{
        if(person){
            person.number = request.body.number;
            
            person.save().then(result => response.json(result)).catch(error=>next(error));
        }
        else{
            response.status(404).end();
        }
    }).catch(error=>next(error));
});

const errorHandler = (error, request, response, next) => {
    

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    else{
        console.log(error.message);
        return response.status(400).send({ error: `${error.name} ${error.message}`});
    } 

    next(error);
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {});