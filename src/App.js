import React, { useState} from "react";
import keys from "./keys";

const url = keys.COMPLETE_URL;

const App = () => {
  const dateBuild = (d) => {
    let date = String(new window.Date());
    return date.slice(3, 15);
  };

  const [cod, setCOD] = useState('');
  const [message, setMessage] = useState('');
  const [count,setCount]= useState('');
  const [city, setCity] = useState({});
  const [list,setList] = useState({});

  const onQueryChangeHandler = (e) =>{
    e.preventDefault();

    fetch(url)
      .then(response =>{
        return response.json()
      })
      .then(data => {
        setCOD(data.cod);
        setMessage(data.message);
        setCount(data.cnt);

       let newCity = {
          id: data.city.id,
          name: data.city.name,
          country: data.city.country,
          population: data.city.population,
          timezone: data.city.timezone,
          sunrise: data.city.sunrise,
          sunset: data.city.sunset
        }
        setCity(newCity);

        let tempVar = {
           id: data.list[0].dt,
           temp: data.list[0].main.temp,
           feels_like: data.list[0].main.feels_like,
           temp_min: data.list[0].main.temp_min,
           temp_max: data.list[0].main.temp_max,
           pressure: data.list[0].main.pressure,
           sea_level: data.list[0].main.sea_level,
           grnd_level: data.list[0].main.grnd_level,
           humidity: data.list[0].main.humidity,
           temp_kf: data.list[0].main.temp_kf
         }
          
       setList(tempVar);
      })
  }

  return (
    <div>
      <form>
        
        <div>
          <div className="location-container">
            <div className="location">
            {city.name}  {city.country}
            </div>
            <div className="date"> {dateBuild(new Date())}</div>
          </div>
          <div className="weather-container">
            <div className="temperature">
               COD = {cod}<br/>
               Message = {message}<br/>
               Count = {count}<br/>
               population = {city.population}<br/>
               timezone = {city.timezone}<br/>
               sunrise = {city.sunrise}<br/>
               sunset = {city.sunset}               
            </div>
            <div className="weather">
                temp: {list.temp}<br/>
                feels_like: {list.feels_like} <br/>
                temp_min: {list.temp_min} <br/>
                temp_max: {list.temp_max} <br/>
                pressure: {list.pressure} <br/>
                sea_level: {list.sea_level} <br/>
                grnd_level: {list.grnd_level} <br/>
                humidity: {list.humidity} <br/>
                temp_kf: {list.temp_kf}
                
            </div>
          </div>
        </div>

        <button type="submit" onClick={onQueryChangeHandler}>Fetch the data</button>
      </form>
    </div>
  );
}

export default App;
