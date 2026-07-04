import { useContext } from "react";
import "./ItemModal.css";
import closebutton from "../../assets/Xclosebutton.png";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card) {
    return null;
  }

  const imageSrc = card.imageUrl || card.link;
  const isOwn = Boolean(
    currentUser && card.owner && currentUser._id === card.owner,
  );

  return (
    <div
      className={`modal ${activeModal === "preview" && "modal_opened"}`}
      onClick={onClose}
    >
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closebutton} alt="closebutton" />
        </button>
        <img src={imageSrc} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__content">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              className="modal__delete-btn"
              type="button"
              onClick={() => onDelete(card._id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
