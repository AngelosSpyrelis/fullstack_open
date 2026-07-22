const BasicData = ({capitals, currencies, languages, area, flags, coatOfArms}) =>{
    return(
        <div className="basic-data">
            <p>Capital: {capitals.join('/ ')}</p>
            <p>Area: {area}</p>
            <ul>
                {
                    Object.entries(currencies).map(([key, values])=><li key={key}>{values.name} {values.symbol}</li>)
                }
            </ul>
            <ul>
                {
                    Object.entries(languages).map(([key, value])=><li key={key}>{value}</li>)
                }
            </ul>
            
            <div>
                <img src={flags.png} alt={flags.alt} />
                <img src={coatOfArms.png} alt={coatOfArms.alt} />
            </div>
        </div>
        
    );
};

const CountryData = ({data}) => {
    if(data){
        return(<div className="selected-country">
            <h2>{data.name.common}</h2>
            <BasicData capitals={data.capital} currencies={data.currencies} languages={data.languages} area={data.area} flags={data.flags} coatOfArms={data.coatOfArms} />
        </div>);
    }
    else{
        return(<p>Select or write the full name of a country to get country data.</p>);
    }
};

export {CountryData};