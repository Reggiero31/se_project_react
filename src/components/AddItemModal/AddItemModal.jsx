import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, handleSubmit, onAddItem, onClose }) {
  const defaultValues = {
    name: "",
    link: "",
    weatherType: "",
  };

  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="node__label">
        Name{""}
        <input
          type="text"
          className="modal__input_input_type_card-name"
          id="name"
          placeholder="Name"
          maxLength="30"
          minLength="1"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{""}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="image URL"
          value={values.link}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend"> weather type;</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            value="hot"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
          />
          hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            value="warm"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
          />
          warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            value="cold"
            type="radio"
            className="modal__radio-input"
          />
          cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
