import ItemCard from "../ItemsCard/ItemsCard";
import "./ClothesSection.css";
export default function ClothesSection({ clothingItems, handleCardClick }) {
  return (
    <div>
      <p>ClothingSection</p>
      <button>AddNew</button>
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
