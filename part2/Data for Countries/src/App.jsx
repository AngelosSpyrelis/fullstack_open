import { useEffect, useState } from 'react';
import { QueryInput } from './components/Query';
import { QueryResults } from './components/QueryResults';
import { CountryData } from './components/CountryData';
import { WeatherData } from './components/WeatherData';
import { countryApi } from './services/countries';
import { getCountryWeather } from './services/weather';
import './index.css';

const App = () => {


  const [query, setQuery] = useState('');
  const [foundCountries, setFoundCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const changeQuery = (event) =>{
    setQuery(event.target.value);
  };  

  useEffect(()=>{
    if(query == ''){return;}
    const queryRegex = new RegExp(`^${query}`, 'i');
    const results = countryApi.checkCountryName(queryRegex);
    setFoundCountries(results);
    if(results.length == 1){
      
      if(selectedCountry?.name.common != results[0].common){
        getCountry(results[0].common);  
      }
      
      return;
    }
    setSelectedCountry(null);
    setWeatherData(null);
    
    
  }, [query]);

  const getCountry =(country) =>{
    const promise = countryApi.getCountryData(country);
    promise.then(data=>{
      setSelectedCountry(data);

      
      const WeatherPromise = getCountryWeather(data.capital[0], data.cca2.toLowerCase());
      WeatherPromise.then(data=>{
        setWeatherData(data)});
    });

    
  };

  const handleShowCountry = (event) =>{
    getCountry(event.target.dataset.country);
  };


  return (
    <div >
      <h1>Country Data</h1>
      <QueryInput value={query} handleChange={changeQuery}/>
      <QueryResults results={foundCountries} onClick={handleShowCountry} />
      <CountryData data={selectedCountry} />
      <WeatherData data={weatherData} />
    </div>
  )
}

export default App;