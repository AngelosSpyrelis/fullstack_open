export const Filter = ({filter, callback}) =>{
    return(<label>Filter:<input type='text' value={filter} name="filter" onChange={callback} /></label>);
}