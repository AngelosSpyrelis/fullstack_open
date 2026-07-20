import { useEffect, useState } from 'react';
import { Filter } from './components/Filter';
import { Form } from './components/Form';
import { Numbers } from './components/Numbers';
import { Notification } from './components/Notification';
import server from './services/persons';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({message: '', isSuccess: false});
  
  const getNumbers = () =>{
    const promise = server.getAll();
    promise.then(data=>setPersons(data));
  };

  const makeNotification = ({message, isSuccess=false, timeout=2000})=>{
    setNotification({...notification, message: message, isSuccess:isSuccess});
    setTimeout(()=>{setNotification({...notification, message: '', isSuccess:false});},timeout);
  };

  const handleNewEntry = (event)=>{
    
    event.preventDefault();
    
    if(newName == ''){return;}
    
    const promise = server.getAll();
    promise.then(data=>{
    
      //I am using a regular for loop to stop the process and avoid unecessary iterations
      for(let i = 0; i < data.length; i++){
        if(data[i].name == newName){
          if(!window.confirm(`${newName} already exists. Would you like to replace their phone No with the one provided?`)){return;}
          data[i].number = newNumber;
          const updatePromise = server.update(data[i].id, data[i]);
          updatePromise.then(()=>{
            getNumbers();
            setNewNumber('');
            setNewName('');
          });
          return;
        }
      }

      const newPersonObject = {name: newName, number: newNumber};
      const creationPromise = server.create(newPersonObject);
      creationPromise.then(()=>{
        getNumbers();
        setNewNumber('');
        setNewName('');
      });
      
    });
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

  
  useEffect(()=>{
    makeNotification({message:'Welcome to the app', isSuccess:true, timeout:5000});
    getNumbers();
  }, []);

  const removeNumber = (event) =>{
    if(!window.confirm(`Are you sure you want to delete ${event.target.dataset.name}?`)){return;}
    const promise = server.deleteEntry(event.target.dataset.id);
    promise.then(response=>{
      if(response.length == 0){
        alert("Removal failed.");
        return;
      }
      getNumbers();
    }).catch(()=>{
      makeNotification({message: `${event.target.dataset.name} has already been removed.`});
    }).finally(()=>{
      getNumbers();
    });
    
  };



  return (
    <div >
      <Notification message={notification.message} isSuccess={notification.isSuccess}/>
      <h1>Phonebook</h1>
      <Filter filter={filter} callback={handleChange}/>
      <Form inputs={inputs} submitCallback={handleNewEntry}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} onClick={removeNumber}/>
    </div>
  )
}

export default App;