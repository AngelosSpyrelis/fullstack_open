import axios from 'axios';

class CountryAPI{
    constructor(){
        this.baseUrl = 'https://studies.cs.helsinki.fi/restcountries/';
        
        //Separating the country names to have a smaller array in memory and not have to contact the server on every request
        this.getCountryNames();
        
        

    }

    async getCountryNames(){

        try{
            const response = await axios.get(`${this.baseUrl}api/all`);
            this.countryNames = response.data.map(country => {
                return {common:country.name.common, official:country.name.official}
            });
        }catch{
            alert("Error contacting the server.");
        }
        
    }

    checkCountryName(regex){
        
        return this.countryNames.filter(country=>regex.test(country.common) || regex.test(country.official));
    }

    getCountryData(country){
        
        return axios.get(`${this.baseUrl}api/name/${country}`).then(response => 
            response.data
        ).catch(()=>{
            alert('Error fetching country data.');
        });
            
        
        
    }
};

const countryApi = new CountryAPI();

export { countryApi };