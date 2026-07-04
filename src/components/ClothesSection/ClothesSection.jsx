import { useContext } from "react";
import ItemCard from "../ItemsCard/ItemsCard";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./ClothesSection.css";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const visibleItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <div className="clothing-section">
      <div className="clothing-section__header">
        <p className="clothing-section_title">clothing section</p>
        <button onClick={handleAddClick} type="button" className="add-btn">
          Add New
        </button>
      </div>
      <ul className="cards__list">
        {visibleItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
