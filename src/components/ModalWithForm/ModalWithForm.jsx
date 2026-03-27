import "./ModalWithForm.css";

function ModalWithForm({children, buttonText, title, isOpened, onClose, name }) {
    return (
        <div className={`modal modal_type_${name} ${isOpened  && "modal_opened"}`}>
        <div className="modal__content"onClick={(e) => e.stopPropagation()} >
            <h2 className="modal__title">{title}</h2>
           <button onClick={onClose} type="button" className="modal__close"/>
        <form name={name} className="modal__form">
            {children}
                <button type="submit"className="modal__submit">
                    {buttonText}
                </button>
        </form>
        </div>
        </div>
    );
};

export default ModalWithForm;