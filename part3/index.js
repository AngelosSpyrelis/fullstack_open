const express = require('express');
const morgan = require('morgan');
const datasets = require('./datasets/persons');

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




app.get('/api/persons', (request, response) => {
    response.json(datasets.persons);
});

app.get('/api/info', (request, response) =>{
    const number = datasets.persons.length;
    const date = new Date().toString();
    response.send(`Phonebook has infor for ${number} persons.<br />${date}`);
});

app.get('/api/persons/:id', (request, response) =>{
    const id = request.params.id;
    const found = datasets.persons.filter(person=>person.id == id);
    if(found.length == 0){
        response.status(404).end("There is no person with the requested id.");
    }
    else{
        response.json(found);
    }
    
});

app.delete('/api/persons/:id', (request, response)=>{
    const id = request.params.id;
    const initLength = datasets.persons.length;
    datasets.persons = datasets.persons.filter(person=>person.id != id);
    if(initLength != datasets.persons.length){
        response.status(204).end();
    }
    else{
        response.status(404).end("There is no person with the requested id.");
    }

});

app.post('/api/persons', (request, response)=>{
    const minValue = 0;
    const maxValue = minValue+1000;
    const id = (Math.floor(Math.random()*(maxValue-minValue+1))+minValue).toString();
    
    const newPerson = {...request.body,id:id};
    const nameRegex = new RegExp(`^${newPerson.name}$`, 'i');
    if(!newPerson.name || !newPerson.number){
        response.status(400);
        response.json({error: "New entries must have a name and a number."});
    }
    else if(datasets.persons.filter(person=>newPerson.name === person.name).length > 0){
        response.status(400);
        response.json({error: `There is already an entry for ${newPerson.name} in the phonebook.`});
    }
    else{
        datasets.persons.push(newPerson);
        response.status(200).end();
    }
    
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {});