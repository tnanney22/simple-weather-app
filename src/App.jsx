import React, { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
 
function App() {
  const [weather,setWeather] = useState({});
  const [locations, setLocations] = useState("Memphis");
  const [photos, setPhotos] = useState([]);
  useEffect (() => {
    ifClicked();
  }, []);

  function ifClicked() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${locations}&appid=3694a78022241d6fc3fa9057f97356c5&units=imperial`)
    .then((res) => {
      if (res.ok) {
        console.log(res.status);
        return res.json();
      } else {
        if (res.status === 404) {
          return alert("Oops, there seems to be an error! That isn't a known location. Please check for possible spelling errors.");
        }
        alert("Oops, there seems to be an error! No location was entered.");
        throw new Error("You have an error");
      }
    })
    .then((object) => {
      setWeather(object);
      console.log(weather);
    })
    .catch((error) => console.log(error));
  fetch(
    `https://api.unsplash.com/search/photos?query=${locations}&client_id=Rybwkgfzrojwwm5AhI0BMOLvWnAe3him3jeeTmXtQtE`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("You made a mistake");
      }
    })
    .then((data) => {
      console.log(data);
      setPhotos(data?.results[0]?.urls?.raw);
    })
    .catch((error) => console.log(error));
}
return (
  <div className="app">
    <div className="wrapper">
      <div className="search">
        <input
          type="text"
          value={locations}
          onChange={(e) => setLocations(e.target.value)}
          placeholder="Enter location"
          className="location_input"
        />
        <button className="location_searcher" onClick={ifClicked}>
          Search Location
        </button>
      </div>
      <div className="app__data">
        <p className="temp">Current Temperature: {weather?.main?.temp} °F</p>
      </div>
      <img className="app__image" src={photos} alt="" />
    </div>
  </div>
);
}

export default App
