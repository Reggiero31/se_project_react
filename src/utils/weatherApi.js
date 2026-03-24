export const getForecastWeather = ({ latitude, longitude }, APIkey) =>
   fetch (
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

  const filterDataFromWeatherAPI = (data) => {




  const weather = {};
  weather.city = data.name;
  weather.temperature = data.main.temp;
  weather.type = getWeatherType(weather.temperature);
  weather.day = isDay(data.sys, Date.now());
  weather.condition = data.weather[0].main.toLowerCase();
  return weather;
};

const getWeatherType = (temp) => {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 65 && temp <= 85) {
    return "warm";
  } else if (temp <= 65) {
    return "cold";
  }
};

export {  filterDataFromWeatherAPI };