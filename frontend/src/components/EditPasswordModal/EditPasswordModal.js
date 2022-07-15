import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

/**
 * The **Login** component representing user authorization or login form.
 *
 * @author
 */

const EditPasswordModal = ({
  isOpen,
  onClose,
  onSubmit,
  loginPassword,
  loginNewPassword,
  setLoginPassword,
  setLoginNewPassword,
}) => {
  const { isValid, errors, handleChange, resetForm } = useFormAndValidation(['login-pwd']);

  const formRef = React.useRef(null);
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    setIsFormValid(formRef.current.checkValidity());
  }, [isOpen, formRef]);

  const handleFormChange = () => {
    setIsFormValid(formRef.current.checkValidity());
  };

  // Reset form values every time the popup opens
  React.useEffect(() => {
    const initialValues = {
      'login-password': '',
      'login-newPassword': '',
    };

    setLoginPassword('');
    setLoginNewPassword('');
    resetForm({ ...initialValues }, { ...initialValues }, true);
  }, [resetForm, setLoginPassword, setLoginNewPassword]);

  const handleInputChange = (event) => {
    if (event.target.name === 'login-passrword') {
      setLoginPassword(event.target.value);
    }
    if (event.target.name === 'login-newPassword') {
      setLoginNewPassword(event.target.value);
    }
    handleChange(event);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isValid || (loginPassword && loginNewPassword)) {
      onSubmit({ loginPassword, loginNewPassword });
    }
  };

  const newPasswordInputClassName = ``;
  const newPasswordErrorClassName = ``;
  const passwordInputClassName = ``;
  const passwordErrorClassName = ``;
  const submitButtonClassName = `form__submit-button form__submit-button_rel_login ${
    !isFormValid && 'form__submit-button_disabled'
  }`;

  return (
    <ModalWithForm
      ref={formRef}
      formTitle="Change password"
      name="change password"
      position="top-right"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
    >
      <div className="form__input-container">
        <label htmlFor="change password" className="form__input-label">
          Old Password
          <span id="login-password-error" className={passwordErrorClassName}></span>
        </label>
        <input
          type="password"
          id="login-password"
          name="login-password"
          placeholder="Old password"
          className="form__input"
          minLength="8"
          value={loginPassword}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form__input-container">
        <label htmlFor="login-password" className="form__input-label">
          New Password
          <span id="login-password-error" className={passwordErrorClassName}></span>
        </label>
        <input
          type="password"
          id="login-password"
          name="login-password"
          placeholder=" Password"
          className="form__input"
          value={loginNewPassword}
          minLength="8"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form__input-container">
        <label htmlFor="login-password" className="form__input-label">
          Repeat new password
          <span id="login-password-error" className={passwordErrorClassName}></span>
        </label>
        <input
          type="password"
          id="login-password"
          name="login-password"
          placeholder=" Password"
          className="form__input"
          value={loginNewPassword}
          minLength="8"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form__button-grp">
        <button
          type="submit"
          className={submitButtonClassName}
          disabled={!isFormValid}
          aria-label="change password"
        >
          Change password
        </button>
      </div>
    </ModalWithForm>
  );
};

export default EditPasswordModal;
