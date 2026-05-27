import ItemCard from "../ItemsCard/ItemsCard";
import "./ClothesSection.css";
export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
}) {
  return (
    <div className="clothing-section">
      <div className="clothing-section__header">
        <p className="clothing-section_title">clothing section</p>
        <button onClick={handleAddClick} type="button" className="add-btn">
          Add New
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
