import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function SideBar({ onEditProfileClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarInitial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="SideBar__Profile">
      <div className="SideBar__user-container">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={`${currentUser.name}'s avatar`}
            className="SideBar__avatar"
          />
        ) : (
          <div className="SideBar__avatar SideBar__avatar_placeholder">
            {avatarInitial}
          </div>
        )}
        <div className="SideBar__info">
          <p className="SideBar__username">{currentUser?.name || "User"}</p>
          <button
            type="button"
            className="SideBar__edit-btn"
            onClick={onEditProfileClick}
          >
            Edit profile
          </button>
          <button
            type="button"
            className="SideBar__edit-btn"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
