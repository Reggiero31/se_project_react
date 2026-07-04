import { handleServerResponse } from "./api";
export const getForecastWeather = ({ latitude, longitude }, apiKey) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => {
    return handleServerResponse(res);
  });
const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const filterDataFromWeatherAPI = (data) => {
  const farneheit = Math.round(data.main.temp);
  const celcius = Math.round((data.main.temp - 32) * (5 / 9));

  const temperature = {
    F: farneheit,
    C: celcius,
  };

  const weather = {};
  weather.city = data.name;
  weather.temperature = temperature;
  weather.type = getWeatherType(temperature.F); // classify using Fahrenheit
  weather.isDay = isDay(data.sys, Date.now());
  weather.condition = data.weather[0].main.toLowerCase();

  return weather;
};

const getWeatherType = (temp) => {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 65 && temp <= 85) {
    return "warm";
  } else {
    return "cold";
  }
};

export { filterDataFromWeatherAPI };
