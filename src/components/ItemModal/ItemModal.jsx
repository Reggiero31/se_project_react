import "./ItemModal.css";


function ItemModal({ activeModal, onClose, Card } ) {
  if(!Card) {return null}
    return (
      <div className={`modal ${activeModal ==="preview" && "modal_opened"}`}>
        <div className="modal__content modal__content_type_image">
             <button onClick={onClose} type="button" className="modal__close">
            close
           </button>
           <img src="" alt="" className="modal__image" />
           <div className="modal__footer">
            <h2 className="modal__caption">{Card.name}
              <p className="modal__weather">weather: {Card.weather}</p>
           </h2>
        </div>
      </div> 
      </div> 
    )
}



export default ItemModal;