import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

/**
 * The **EditPasswordComponent** component representing form to change user's login password.
 *
 *  @author [Nuriya](https://github.com/NuriyaAkh)
 */

const EditPasswordModal = ({ isOpen, onClose, onUpdatePassword }) => {
  const { values, isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'login-password',
    'new-login-password',
    'confirm-login-password',
  ]);

  const formRef = useRef();
  const [isFormValid, setIsFormValid] = useState(false);

  //the validation if user entered the correct old password  needs to be implemented

  useEffect(() => {
    setIsFormValid(
      values['new-login-password'] !== values['login-password'] &&
      values['new-login-password'] === values['confirm-login-password'] &&
      formRef.current.checkValidity()
    );
  }, [
    isOpen,
    formRef,
    values,
  ]);

  const handleFormChange = () => {
    setIsFormValid(formRef.current.checkValidity());
  };

  // Reset form values every time the popup opens
  useEffect(() => {
    const initialValues = {
      'login-password': '',
      'new-login-password': '',
      'confirm-login-password': '',
    };

    const initialErrorValues = {
      'login-password': '',
      'new-login-password': '',
      'confirm-login-password': '',
    };

    resetForm({ ...initialValues }, { ...initialErrorValues }, true);
  }, [isOpen, resetForm]);

  const handleInputChange = (event) => handleChange(event);

  const handleFormSubmit = (event) => {
    console.log(values);
    event.preventDefault();
    // naming of the fields to be checked again when backend API is connected
    if (
      isValid &&
      values['new-login-password'] !== values['login-password'] &&
      values['new-login-password'] === values['confirm-login-password']
    ) {
      onUpdatePassword(values['confirm-login-password']);
      onClose();
    }
  };

  const passwordErrorClassName = ``;
  const submitWideButtonClassName = `form__submit-button ${!isFormValid && 'form__submit-button_disabled'}`;

  return (
    <ModalWithForm
      ref={formRef}
      formTitle="Change password"
      name="change-password"
      position="middle"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
    >
      <div className="form__input-container">
        <label htmlFor="login-password" className="form__input-label">
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
          value={values['login-password']}
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
          id="new-login-password"
          name="new-login-password"
          placeholder="Password"
          className="form__input"
          value={values['new-login-password']}
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
          id="confirm-login-password"
          name="confirm-login-password"
          placeholder="Password"
          className="form__input"
          value={values['confirm-login-password']}
          minLength="8"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form__button-grp">
        <button
          type="submit"
          className={submitWideButtonClassName}
          disabled={!isFormValid}
          aria-label="Change password"
        >
          Change password
        </button>
      </div>
    </ModalWithForm>
  );
};
EditPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdatePassword: PropTypes.func.isRequired,
};
export default EditPasswordModal;
