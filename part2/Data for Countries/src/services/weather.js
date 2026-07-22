import axios from "axios";


const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY;

const getCountryWeather = (capital, country) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${country}&APPID=${apiKey}`).then(response => response.data).catch(()=>{
        return null;
    });
};

export {getCountryWeather};