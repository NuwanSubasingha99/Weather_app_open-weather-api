const apiKey = "6a90e7cfecfceec912c1a0f0737992b8";

const weatherData = document.getElementById("weather-data");
const cityName = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event)=>{

    event.preventDefault();
    const cityValue = cityName.value;
    getWeatherData(cityValue);

})

async function getWeatherData (cityValue){

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if(!response.ok){
            throw new Error("network response was not ok")
        }

        const data = await response.json()
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ]

        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Icon">`;
        weatherData.querySelector(".tempereture").textContent = `${temperature}°C`;
        weatherData.querySelector(".description").textContent = `${description}`;
        weatherData.querySelector(".details").innerHTML = details.map((detail) =>`<div>${detail}</div>`).join("");

        

    } catch (error) {

        console.log(error);
        
    }

}