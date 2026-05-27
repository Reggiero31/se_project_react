import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  weatherData,
  handleAddClick,
  clothingItems,
  handleCardClick,
}) {
  return (
    <section className="Profile">
      <SideBar weatherData={weatherData} handleAddClick={handleAddClick} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}

export default Profile;
