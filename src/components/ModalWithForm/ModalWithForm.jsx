import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText = "Save",
  title,
  isOpen,
  onClose,
  name,
  onSubmit,
  errorMessage,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          {errorMessage ? <p className="modal__error">{errorMessage}</p> : null}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
