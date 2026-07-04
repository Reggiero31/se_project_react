import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  authError,
  onSwitchToRegister,
}) {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange } = useForm(defaultValues);

  function onFormSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onFormSubmit}
      buttonText="Log in"
      errorMessage={authError}
    >
      <label className="modal__label">
        Email
        <input
          name="email"
          required
          type="email"
          className="modal__input"
          id="login-email"
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
          id="login-password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <button
        type="button"
        className="modal__switch-link"
        onClick={onSwitchToRegister}
      >
        Need an account? Sign up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
