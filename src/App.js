import WeatherApp from "./Components/WeatherApp/WeatherApp";
import React, { useState } from "react";

import search__icon from "./Assets/search.png";
import clear__icon from "./Assets/clear.png";
import cloud__icon from "./Assets/cloud.png";
import drizzle__icon from "./Assets/drizzle.png";
import humidity__icon from "./Assets/humidity.png";
import rain__icon from "./Assets/rain.png";
import snow__icon from "./Assets/snow.png";
import wind__icon from "./Assets/wind.png";

function App() {
  const API_KEY = "b0392e46990d81552ab13c39fd59dfab";
  const [tempChange, setTempChange] = useState(0);
  const [cityChange, setCityChange] = useState("City");
  const [windChange, setWindChange] = useState(0);
  const [humidityChange, setHumidityChange] = useState(0);
  const [imageChange, setImageChange] = useState(cloud__icon);

  const search = async () => {
    const element = document.querySelector(".input-city");

    if (element.value && element.value[0] !== " ") {
      await getData(element);
    }
  };

  const getData = async (elem) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${elem.value}&units=Metric&appid=${API_KEY}`;
    const respone = await fetch(url);
    const data = await respone.json();
    setTempChange(Math.round(data.main.temp));
    setCityChange(data.name);
    setWindChange(Math.round(data.wind.speed));
    setHumidityChange(data.main.humidity);
    changeImage(data.weather[0].icon);
  };
  const changeImage = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        setImageChange(clear__icon);
        break;
      case "02d":
      case "02n":
        setImageChange(cloud__icon);
        break;
      case "03d":
      case "03n":
        setImageChange(drizzle__icon);
        break;
      case "04d":
      case "04n":
        setImageChange(drizzle__icon);
        break;
      case "09d":
      case "09n":
        setImageChange(rain__icon);
        break;
      case "10d":
      case "10n":
        setImageChange(rain__icon);
        break;
      case "13d":
      case "13n":
        setImageChange(snow__icon);
        break;
      default:
        setImageChange(clear__icon);
        break;
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="input-city" placeholder="Search..." />
        <div className="search-icon" onClick={search}>
          <img src={search__icon} alt="search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={imageChange} alt="" />
      </div>
      <div className="weather-temp">{tempChange}°C</div>
      <div className="weather-location">{cityChange}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity__icon} alt="" className="icon" />
          <div className="data">
            <div className="hymidity-percent">{humidityChange}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind__icon} alt="" className="icon" />
          <div className="data">
            <div className="hymidity-percent">{windChange} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
