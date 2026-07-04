import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./ItemsCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };
  const imageSrc = item.imageUrl || item.link;

  const isLiked = Boolean(
    currentUser && item.likes?.some((id) => id === currentUser._id),
  );
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleLike = () => {
    if (!onCardLike) return;
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={imageSrc}
        alt={item.name}
      />
      {currentUser && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
        >
          {isLiked ? "♥" : "♡"}
        </button>
      )}
    </li>
  );
}

export default ItemCard;
