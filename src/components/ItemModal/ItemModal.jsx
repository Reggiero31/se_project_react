import "./ItemModal.css";
import closebutton from "../../assets/Xclosebutton.png";

function ItemModal({ activeModal, onClose, card } ) {
  if(!card) {return null}
    return (
      <div className={`modal ${activeModal ==="preview" && "modal_opened"}`}onClick = {onClose}>
        <div className="modal__content modal__content_type_image"onClick={(e) => e.stopPropagation()}>
             <button onClick={onClose} type="button" className="modal__close">
            <img src= {closebutton} alt="closebutton" />
           </button>
           <img src={card.imageUrl} alt={card.name} className="modal__image" />
           <div className="modal__footer">
            <h2 className="modal__caption">{card.name}
           </h2>
           <p className="modal__weather">weather: {card.weather}</p>
        </div>
      </div> 
      </div> 
    )
}



export default ItemModal;