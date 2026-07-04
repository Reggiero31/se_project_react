import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const isDay = weatherData.isDay ?? true;
  const condition = weatherData.condition ?? "clear";
  const filteredOptions = weatherOptions.filter((option) => {
    return option.day === isDay && option.condition === condition;
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {" "}
        {Math.round(
          weatherData.temperature?.[currentTemperatureUnit] ?? 0,
        )}{" "}
        &deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption.url}
        alt="Weather illustration"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
