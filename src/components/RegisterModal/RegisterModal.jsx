import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  authError,
  onSwitchToLogin,
}) {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
  };

  const { values, handleChange } = useForm(defaultValues);

  function onFormSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onFormSubmit}
      buttonText="Next"
      errorMessage={authError}
    >
      <label className="modal__label">
        Name
        <input
          name="name"
          required
          type="text"
          className="modal__input"
          id="register-name"
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
          id="register-avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Email
        <input
          name="email"
          required
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          name="password"
          required
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <button
        type="button"
        className="modal__switch-link"
        onClick={onSwitchToLogin}
      >
        Already have an account? Log in
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
