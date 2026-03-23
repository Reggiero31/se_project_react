import "./ItemModal.css";
import closebutton from "../../assets/Xclosebutton.png";

function ItemModal({ activeModal, onClose, Card } ) {
  if(!Card) {return null}
    return (
      <div className={`modal ${activeModal ==="preview" && "modal_opened"}`}>
        <div className="modal__content modal__content_type_image">
             <button onClick={onClose} type="button" className="modal__close">
            <img src= {closebutton} alt="closebutton" />
           </button>
           <img src="{card.link}" alt="{card.name}" className="modal__image" />
           <div className="modal__footer">
            <h2 className="modal__caption">{Card.name}
           </h2>
           <p className="modal__weather">weather: {Card.weather}</p>
        </div>
      </div> 
      </div> 
    )
}



export default ItemModal;