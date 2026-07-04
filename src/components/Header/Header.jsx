import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({
  handleAddClick,
  weatherData,
  onLoginClick,
  onRegisterClick,
  isLoggedIn,
  handleLogout,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const avatarInitial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo"></img>
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              Add clothes
            </button>
            <Link to="/profile">
              <div className="header__user-container">
                <p className="header__username">
                  {currentUser?.name || "User"}
                </p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={`${currentUser.name}'s avatar`}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar header__avatar_placeholder">
                    {avatarInitial}
                  </div>
                )}
              </div>
            </Link>
            <button
              onClick={handleLogout}
              type="button"
              className="header__add-clothes-btn"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onRegisterClick}
              type="button"
              className="header__add-clothes-btn"
            >
              Sign up
            </button>
            <button
              onClick={onLoginClick}
              type="button"
              className="header__add-clothes-btn"
            >
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
