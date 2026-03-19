import "./WeatherCard.css"
import sunnyday from "../../assets/day/sunny.png"
import { weatherOptions } from "../../utils/constants";

function WeatherCard({weatherData}) {
    return <section className="weather-card">
         <p className="weather-card__temp"> 75 &deg; F</p>
        <img src={sunnyday} alt="sunny" className="weather-card__image" />
    </section>
    
}

export default WeatherCard;