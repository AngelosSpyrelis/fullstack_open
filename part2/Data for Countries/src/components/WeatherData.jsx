export const WeatherData = ({data}) =>{
    
    if(!data){
        return(
            <p>No weather data available</p>
        );
    }
    const temp = (data.main.temp-273.15).toFixed(2);
    return(
        <div>
            <h3>Weather in {data.name}</h3>
            <p>Temperature: {temp} Celsius</p>
            <img src={" https://openweathermap.org/payload/api/media/file/"+data.weather[0].icon+".png"} />
            <p>Wind {data.wind.speed}m/s</p>
        </div>
    );
};