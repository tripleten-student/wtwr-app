import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

/**
 * The **EditPasswordComponent** component representing form to change user's login password.
 *
 *  @author [Nuriya](https://github.com/NuriyaAkh)
 */

const EditPasswordModal = ({
  isOpen,
  onClose,
  onUpdatePassword,
  errorMessage,
  success,
  resetErrorMessage,
  resetSuccessMessage,
}) => {
  const { values, isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'current-login-password',
    'new-login-password',
    'confirm-login-password',
  ]);

  const formRef = useRef();
  const [isFormValid, setIsFormValid] = useState(false);

  //the validation if user entered the correct old password  needs to be implemented
  useEffect(() => {
    setIsFormValid(
      values['new-login-password'] !== values['current-login-password'] &&
        values['new-login-password'] === values['confirm-login-password'] &&
        formRef.current.checkValidity()
    );
  }, [isOpen, formRef, values]);

  // Reset form values every time the popup opens
  useEffect(() => {
    const initialValues = {
      'current-login-password': '',
      'new-login-password': '',
      'confirm-login-password': '',
    };

    resetForm({ ...initialValues }, { ...initialValues }, true);
  }, [isOpen, resetForm]);

  // Event handlers
  const handleFormChange = () => setIsFormValid(formRef.current.checkValidity());
  const handleInputChange = (event) => {
    handleChange(event);
    resetErrorMessage();
    resetSuccessMessage();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // naming of the fields to be checked again when backend API is connected
    if (
      isValid &&
      values['new-login-password'] !== values['current-login-password'] &&
      values['new-login-password'] === values['confirm-login-password']
    ) {
      onUpdatePassword({
        oldPassword: values['current-login-password'],
        newPassword: values['confirm-login-password'],
      });
    }
  };

  // Set form elements classnames
  const setInputLabelClassName = (name) =>
    `form__input-label ${!isValid && errors[name] && `form__input-label_error`}`;
  const setInputClassName = (name) =>
    `form__input ${!isValid && errors[name] && `form__input_error`}`;
  const setErrorClassName = (name) =>
    `form__error ${!isValid && errors[name] && `form__error_visible`}`;
  const submitButtonClassName = `form__submit-button ${
    !isFormValid && 'form__submit-button_disabled'
  }`;

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
        <div className="form__input-label-container">
          <label
            htmlFor="current-login-password"
            className={setInputLabelClassName('current-login-password')}
          >
            Old Password
          </label>
          <p id="login-password-error" className={setErrorClassName('current-login-password')}>
            {errors['current-login-password'] && '(this is not a valid password)'}
          </p>
        </div>
        <input
          type="password"
          id="current-login-password"
          name="current-login-password"
          placeholder="Old password"
          className={setInputClassName('current-login-password')}
          minLength="8"
          value={values['current-login-password']}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form__input-container">
        <div className="form__input-label-container">
          <label
            htmlFor="new-login-password"
            className={setInputLabelClassName('new-login-password')}
          >
            New Password
          </label>
          <p id="login-password-error" className={setErrorClassName('new-login-password')}>
            {errors['new-login-password'] && '(this is not a valid password)'}
          </p>
        </div>
        <input
          type="password"
          id="new-login-password"
          name="new-login-password"
          placeholder="Password"
          className={setInputClassName('new-login-password')}
          value={values['new-login-password']}
          minLength="8"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form__input-container">
        <div className="form__input-label-container">
          <label
            htmlFor="confirm-login-password"
            className={setInputLabelClassName('confirm-login-password')}
          >
            Repeat new password
          </label>
          <p id="login-password-error" className={setErrorClassName('confirm-login-password')}>
            {errors['confirm-login-password'] && '(this is not a valid password)'}
          </p>
        </div>
        <input
          type="password"
          id="confirm-login-password"
          name="confirm-login-password"
          placeholder="Password"
          className={setInputClassName('confirm-login-password')}
          value={values['confirm-login-password']}
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
          aria-label="Change password"
        >
          Change password
        </button>
        {errorMessage && <p className="form__invalid-message">{errorMessage}</p>}
        {success && <p className="form__valid-message">Password is successfully changed.</p>}
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
