export const WeatherData = ({data}) =>{
    
    if(!data){
        return(
            <p>No weather data available</p>
        );
    }
    const temp = (data.main.temp-273.15).toFixed(2);
    return(
        <div className="column-flex">
            <h2>Weather in {data.name}</h2>
            <p>Temperature: {temp} Celsius</p>
            <img className="weather-icon" src={" https://openweathermap.org/payload/api/media/file/"+data.weather[0].icon+".png"} />
            <p>Wind {data.wind.speed}m/s</p>
        </div>
    );
};