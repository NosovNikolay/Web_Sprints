const key = 'f1950ff8df246908813fc2df3eb6bf24';

let cityName = prompt("Input city name", "kyiv");
document.getElementById("cityName").innerHTML = cityName.toUpperCase();

const daysData = document.getElementsByClassName("date");
const temperatureByDates = document.getElementsByClassName("temperature");
const icos = document.getElementsByClassName("weather_img");

const apiCall = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=${key}`;

fetch(apiCall)
    .then((data) => {
        if (data.ok)
            return data.json()
        else {
            throw new Error("Error");;
        }
    })
    .catch((e) => {
        console.log('Error = ', e);
        return;
    }).then((data) => {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${key}`

        fetch(url)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                for (let i = 0; i < temperatureByDates.length; i++) {
                    daysData[i].innerHTML = new Date(data.daily[i].dt * 1000).toLocaleString('en-US', { month: "long", day: "numeric" })
                    temperatureByDates[i].innerHTML = `${Math.round(data.daily[i].temp.eve)}°`;
                    icos[i].src = "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
                }
            })

    })