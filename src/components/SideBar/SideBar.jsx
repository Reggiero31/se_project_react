import "./SideBar.css";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";

export default function SideBar({ weatherData, handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="SideBar__Profile">
      
      
        <div className="SideBar__user-container">
          <p className="SideBar__username">Terrence Tegegne</p>
          <img
            src={avatar}
            alt="Terrence Tegegne"
            className="SideBar__avatar"
          ></img>
        </div>
     
    </div>
  );
}
