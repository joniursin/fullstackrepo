const api_key = import.meta.env.VITE_SOME_KEY
import { useState, useEffect } from "react";
import axios from 'axios'

const Country = ({country, onlyOne, setNewSearch}) => {
  const [weather, setWeather] = useState(null);

  const getWeather = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`).then((response) => {setWeather(response.data)})
  }

  useEffect(() => getWeather(), [])

  if (onlyOne) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <div>{Object.values(country.languages).map(language => (<li key={language}>{language}</li>))}</div>
        <img src={country.flags.png} alt="Flag" />
        <h2>Weather in {country.capital}</h2>
        <div>Temperature {weather.main.temp} Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
        <div>Wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
  else {
    return <div>{country.name.common} <button onClick={() => setNewSearch(country.name.common)}>Show</button> </div>
  }
}

export default Country