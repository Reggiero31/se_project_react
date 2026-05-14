import "./SideBar.css";
import weatherData from "../WeatherCard/WeatherCard";

export default function SideBar() {
  return;
  <div className="SideBar__Profile">
    <img className="SideBar__logo" src={logo} alt="logo"></img>
    <p className="SideBar__date-and-location">
      {currentDate}, {weatherData.city}
    </p>
    <ToggleSwitch />
    <button
      onClick={handleAddClick}
      type="button"
      className="SideBar__add-clothes-btn"
    >
      Add clothes
    </button>
    <Link to="/SideBar">
      <div className="SideBar__user-container">
        <p className="SideBar__username">Terrence Tegegne</p>
        <img
          src={avatar}
          alt="Terrence Tegegne"
          className="SideBar__avatar"
        ></img>
      </div>
    </Link>
  </div>;
}
