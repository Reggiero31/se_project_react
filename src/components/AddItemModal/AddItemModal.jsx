import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, onAddItem, onClose }) {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };

  const { values, handleChange, handleReset } = useForm(defaultValues);

  function onFormSubmit(evt) {
    evt.preventDefault();
    onAddItem(values).then(() => {
      handleReset();
    });
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onFormSubmit}
    >
      <label className="modal__label">
        Name{""}
        <input
          name="name"
          required
          type="text"
          className="modal__input"
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
          name="imageUrl"
          required
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend"> weather type;</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
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
            name="weatherType"
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
            name="weatherType"
            id="cold"
            value="cold"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
          />
          cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
