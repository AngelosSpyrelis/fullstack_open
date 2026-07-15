export const Numbers = ({persons, filter})=>{
    
    if(filter == ''){filter = '.*';}
    
    const regex = new RegExp(`^${filter}`, 'i');
    
    return(
      <ul>
        {persons.map(person=>{if(regex.test(person.name)){return <li key={person.name}>{person.name}: {person.number}</li>}})}
      </ul>
    );
  }; 