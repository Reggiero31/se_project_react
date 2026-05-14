import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../Footer/Contexts/CurrentTemperatureUnitContext";
import sunnyday from "../../assets/day/sunny.png";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext)
  console.log(weatherData);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {" "}
        {Math.round(weatherData.temperature [currentTemperatureUnit])} &deg; {currentTemperatureUnit}
      </p>
      <img src={weatherOption.url} alt="" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
