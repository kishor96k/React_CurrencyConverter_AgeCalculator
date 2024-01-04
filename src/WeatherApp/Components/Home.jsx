import React, { useState } from 'react';
import './Home.css'
import clearimg from './assets/images/clear.png';
import cloudimg from './assets/images/cloud.png';
import drizzleimg from './assets/images/drizzle.png';
import humidityimg from './assets/images/humidity.png';
import rainimg from './assets/images/rain.png';
import searchimg from './assets/images/search.png';
import snowimg from './assets/images/snow.png';
import windimg from './assets/images/wind.png';

const Home = () => {

    const apikey = `cd1d9b417382358e286ef4c168256a09`;


    const [wicon, setIocn] = useState(cloudimg);

    const searchData = async () => {
        const elm = document.getElementsByClassName('cityInput');
        if (elm[0].value === '') {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${elm[0].value}&appid=${apikey}`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(`weather of ${elm[0].value}`, data);

        const humidity = document.getElementsByClassName('humidity-percentage');
        const wind = document.getElementsByClassName('wind-rate');
        const temprature = document.getElementsByClassName('weather_temp');
        const location = document.getElementsByClassName('weather_location');

        humidity[0].innerHTML = data.main.humidity + '%';
        wind[0].innerHTML = data.wind.speed + 'km/h';
        temprature[0].innerHTML = data.main.temp + '°C';
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
            setIocn(clearimg);
        } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
            setIocn(cloudimg);
        } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
            setIocn(drizzleimg);
        } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
            setIocn(drizzleimg);
        } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
            setIocn(rainimg);
        } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
            setIocn(snowimg);
        }else{
            setIocn(clearimg);
        }

    }

    return (
        <>
            <div className='container'>
                <div className="top-bar">
                    <input type="text" className='cityInput' name="" id="" />
                    <div className="search-icon" onClick={searchData}>
                        <img src={searchimg} alt="" />
                    </div>
                </div>
                <div className="weather_img">
                    <img src={wicon} alt="" />
                </div>
                <div className="weather_temp">
                </div>
                <div className="weather_location">
                </div>
                <div className="data-conteiner">
                    <div className="elememt">
                        <img className='iconimage' src={humidityimg} alt="" />
                        <div className="data">
                            <div className="humidity-percentage">
                            </div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="elememt">
                        <img className='iconimage' src={windimg} alt="" />
                        <div className="data">
                            <div className="wind-rate">
                            </div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;