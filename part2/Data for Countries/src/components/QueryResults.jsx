export const QueryResults = ({results, onClick}) => {
    if(results.length <= 10 && results.length > 1){
        return(
            <ul className="query-results">
                {
                    results.map(result => <li key={result.common}>{result.common}<button data-country={result.common} onClick={onClick}>Show</button></li>)
                }
            </ul>
        );
    }
    else if(results.length == 0){
        return(
        <p>Start writing in the search bar to get results.</p>);
    }
    else if(results.length > 10){
        return(
        <p>Too many matches. Please narrow down your query.</p>);
    }
    
};