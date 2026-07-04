import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  weatherData,
  handleAddClick,
  clothingItems,
  handleCardClick,
  onCardLike,
  onEditProfileClick,
  handleLogout,
}) {
  return (
    <section className="Profile">
      <SideBar
        weatherData={weatherData}
        handleAddClick={handleAddClick}
        onEditProfileClick={onEditProfileClick}
        handleLogout={handleLogout}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}

export default Profile;
