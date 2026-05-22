import { handleServerResponse } from "./api";
export const getForecastWeather = ({ latitude, longitude }, APIkey) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((res) => {
    handleServerResponse(res);
  });
const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const filterDataFromWeatherAPI = (data) => {
  const kelvin = data.main.temp;

  const toF = (k) => Math.round(((k - 273.15) * 9) / 5 + 32);
  const toC = (k) => Math.round(k - 273.15);

  const temperature = {
    F: toF(kelvin),
    C: toC(kelvin),
  };

  const weather = {};
  weather.city = data.name;
  weather.temperature = temperature;
  weather.type = getWeatherType(temperature.F); // classify using Fahrenheit
  weather.day = isDay(data.sys, Date.now());
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
