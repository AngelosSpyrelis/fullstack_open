const BasicData = ({capitals, currencies, languages, area, flags, coatOfArms}) =>{
    return(
        <div className="column-flex">
            <p>Capital: {capitals.join('/ ')}</p>
            <p>Area: {area}</p>
            <div>
                <h3>Currencies</h3>
                <ul>
                    {
                        Object.entries(currencies).map(([key, values])=><li key={key}>{values.name} {values.symbol}</li>)
                    }
                </ul>
            </div>
            <div>
                <h3>Languages</h3>
                <ul>
                    {
                        Object.entries(languages).map(([key, value])=><li key={key}>{value}</li>)
                    }
                </ul>
            </div>
            <div>
                <h3>Flags</h3>
                <div className="flags column-flex">
                    <img src={flags.png} alt={flags.alt} />
                    <img src={coatOfArms.png} alt={coatOfArms.alt} />
                </div>
            </div>
            
        </div>
        
    );
};

const CountryData = ({data}) => {
    if(data){
        return(<div>
            <h2 className="data">{data.name.common}</h2>
            <BasicData capitals={data.capital} currencies={data.currencies} languages={data.languages} area={data.area} flags={data.flags} coatOfArms={data.coatOfArms} />
        </div>);
    }
    else{
        return(<p>Select or write the full name of a country to get country data.</p>);
    }
};

export {CountryData};