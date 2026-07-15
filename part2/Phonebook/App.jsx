import { useState } from 'react';
import { Filter } from './components/Filter';
import { Form } from './components/Form';
import { Numbers } from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');


  const handleNewEntry = (event)=>{
    
    event.preventDefault();
    
    if(newName == ''){return;}
    
    const newPersonObject = {name: newName, number:newNumber};
    const matches = persons.filter(person=>person.name===newPersonObject.name);
    if(matches.length>0){
      alert(`${newName} already exists in the phonebook.`);
      return;
    }
    setPersons(persons.concat(newPersonObject));
    setNewNumber('');
    setNewName('');
  };
  const handleChange = (event)=>{
    switch(event.target.name){
      case 'name': 
        setNewName(event.target.value); break;
      case 'number': 
        setNewNumber(event.target.value); break;
      case 'filter': 
        setFilter(event.target.value); break;
      default: return;
    }
  };

  

  const inputs = [
    {
      name:'name',
      type:'text',
      value: newName,
      inputCallback: handleChange 
    },
    {
      name:'number',
      type:'tel',
      value: newNumber,
      inputCallback: handleChange 
    }
  ];



  return (
    <div >
      <h2>Phonebook</h2>
      <Filter filter={filter} callback={handleChange}/>
      <Form inputs={inputs} submitCallback={handleNewEntry}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter}/>
    </div>
  )
}

export default App