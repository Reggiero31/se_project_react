import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ weatherData, handleAddClick, clothingItems }) {
  return (
    <section className="Profile">
      <SideBar weatherData={weatherData} handleAddClick={handleAddClick} />
      <ClothesSection clothingItems={clothingItems} handleCardClick={handleAddClick} />
    </section>
  );
}

export default Profile;
