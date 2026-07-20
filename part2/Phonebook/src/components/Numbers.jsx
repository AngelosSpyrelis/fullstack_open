export const Numbers = ({persons, filter, onClick})=>{
    
    if(filter == ''){filter = '.*';}
    
    const regex = new RegExp(`^${filter}`, 'i');
    
    return(
      <ul>
        {persons.map(person=>{if(regex.test(person.name)){return <li key={person.name}>{person.name}: {person.number} <button onClick={onClick} data-id={person.id} data-name={person.name}>delete</button></li>}})}
      </ul>
    );
  }; 