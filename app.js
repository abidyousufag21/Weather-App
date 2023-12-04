if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => {
        console.log("service worker registered");
        Notification.requestPermission().then((res) => {
          if (Notification.permission == "granted") {
            console.log("Granted Permission");
            return;
          }
          console.log(res);
        });
      })
      .catch((err) => console.log("service worker not registered", err));
  });
  navigator.serviceWorker.ready.then((Notification) => {
    var options = {
      body: "This is reminder message",
      icon: "/assets/icons/icon-48x48.png",
    };
    Notification.showNotification("This is Weather App", options);
  });
}

setInterval(() => {
  document.querySelector(".time").innerHTML = moment().format(`hh:mm:ss`);
}, 1000);

setInterval(() => {
  document.querySelector(".date").innerHTML = moment().format(
    `D dddd, of MMMM YYYY<br>`
  );
}, 1000);

const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const feels_like = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const location_not_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather-body");
//const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitiude}&lon=${longitude}&appid=${api_key}`;
////https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
async function checkWeather(city) {
  const api_key = "d787095197335520541ed14ea8e885c0";
  const latitiude = 24.9056;
  const longitude = 67.0822;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;


  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );
  console.log(weather_data);

  if (weather_data.cod === "404") {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    return;
  }

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";

  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.05)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  feels_like.innerHTML = `${weather_data.main.feels_like}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "./image/cloud.png";
      break;
    case "Clear":
      weather_img.src = "./image/clear.png";
      break;
    case "Rain":
      weather_img.src = "./image/rain.png";
      break;
    case "Mist":
      weather_img.src = "./image/mist.png";
      break;
    case "Snow":
      weather_img.src = "./image/snow.png";
      break;
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
