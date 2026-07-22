export const QueryInput = ({query, handleChange}) =>{
    return(
        <label>Find Countries
            <input type="text"
            value={query}
            onChange={handleChange} />
        </label>
    );
};