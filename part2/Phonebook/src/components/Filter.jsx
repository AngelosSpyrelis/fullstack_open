export const Filter = ({filter, callback}) =>{
    return(<label>Filter:<input type='text' value={filter} data-state="filter" onChange={callback} /></label>);
}