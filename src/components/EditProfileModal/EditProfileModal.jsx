import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

function EditProfileModal({
  isOpen,
  onClose,
  onUpdateProfile,
  authError,
  currentUser,
}) {
  const defaultValues = {
    name: "",
    avatar: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, setValues]);

  function onFormSubmit(evt) {
    evt.preventDefault();
    onUpdateProfile(values);
  }

  return (
    <ModalWithForm
      title="Edit profile"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onFormSubmit}
      buttonText="Save changes"
      errorMessage={authError}
    >
      <label className="modal__label">
        Name
        <input
          name="name"
          required
          type="text"
          className="modal__input"
          id="edit-profile-name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          name="avatar"
          required
          type="url"
          className="modal__input"
          id="edit-profile-avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
