import './Register.css';
import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import ClothingSelectorButton from '../ClothingSelectorButton/ClothingSelectorButton';
import { clothingItems } from '../../utils/formConstants';

/**
 * The **Register** component for user sign up and submission to the backend.
 *
 * @author [Devin](https://github.com/mentalcaries)
 */

const Register = ({ isOpen, onClose, onSubmit }) => {
  const [credentialsOpen, setCredentialsOpen] = useState(isOpen);
  const [personalInfoOpen, setPersonalInfoOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [clothingPreferences, setClothingPreferences] = useState([]);

  const { values, isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'register-email',
    'register-password',
    'confirm-password',
    'register-name',
  ]);

  const {
    'register-email': registerEmail,
    'register-password': registerPassword,
    'confirm-password': confirmPassword,
    'register-name': name,
  } = values;

  const credentialsRef = React.useRef(null);
  const personalInfoRef = React.useRef(null);
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    setIsFormValid(registerPassword === confirmPassword && credentialsRef.current.checkValidity());
  }, [isOpen, credentialsRef, registerPassword, confirmPassword]);

  const handleFormChange = () => {
    credentialsRef.current?.name && setIsFormValid(credentialsRef.current.checkValidity());
    personalInfoRef.current?.name && setIsFormValid(personalInfoRef.current.checkValidity());
  };

  // Reset form values every time the popup opens

  const initialValues = {
    'register-email': '',
    'register-password': '',
    'confirm-password': '',
    'register-name': '',
  };

  const handleInputChange = (event) => {
    handleChange(event);
    event.target.name === 'register-avatar' && setAvatar(event.target.value);
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (event.target.name === 'register' && isValid) {
      setCredentialsOpen(false);
      setPersonalInfoOpen(true);
      setIsFormValid(false);
    }

    if (event.target.name === 'personal-details') {
      setPersonalInfoOpen(false);
      setPreferencesOpen(true);
    }
  };

  const handleItemSelect = (selection) => {
    clothingPreferences.includes(selection)
      ? setClothingPreferences(clothingPreferences.filter((item) => item !== selection))
      : clothingPreferences.push(selection);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      registerEmail: values['register-email'],
      registerPassword: values['register-password'],
      name: values['register-name'],
      avatar,
      clothingPreferences,
    });
    onClose();
    resetForm({ ...initialValues }, { ...initialValues }, true);
    setPreferencesOpen(false);
    setCredentialsOpen(true);
  };

  const emailInputClassName = ``;
  const emailErrorClassName = ``;
  const passwordInputClassName = ``;
  const passwordErrorClassName = ``;
  const submitButtonClassName = `form__submit-button form__submit-button_rel_login ${
    !isFormValid && 'form__submit-button_disabled'
  }`;

  return (
    <ModalWithForm
      ref={credentialsRef}
      formTitle="Sign up"
      name={
        (credentialsOpen && 'register') ||
        (personalInfoOpen && 'personal-details') ||
        (preferencesOpen && 'preferences') ||
        ''
      }
      position="top-right"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={preferencesOpen ? handleSubmit : handleNext}
      onChange={handleFormChange}
    >
      {credentialsOpen && (
        <>
          <div className="form__input-container">
            <label htmlFor="register-email" className="form__input-label">
              Email
              <span id="register-email-error" className={emailErrorClassName}></span>
            </label>
            <input
              type="email"
              id="register-email"
              name="register-email"
              placeholder="Email"
              className="form__input"
              value={registerEmail}
              onChange={handleInputChange}
              required
              autoFocus
            />
          </div>
          <div className="form__input-container">
            <label htmlFor="register-password" className="form__input-label">
              Password
              <span id="register-password-error" className={passwordErrorClassName}></span>
            </label>
            <input
              type="password"
              id="register-password"
              name="register-password"
              placeholder="Password"
              className="form__input"
              value={registerPassword}
              minLength="8"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form__input-container">
            <label htmlFor="confirm-password" className="form__input-label">
              Confirm Password
              <span id="confirm-password-error" className={passwordErrorClassName}></span>
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Password"
              className="form__input"
              value={confirmPassword}
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
              aria-label="Next page"
            >
              Next
            </button>
            <p>or</p>
            <button type="button" className="form__secondary-button" aria-label="Login">
              Login
            </button>
          </div>
        </>
      )}

      {personalInfoOpen && (
        <>
          <div className="form__input-container">
            <label htmlFor="register-name" className="form__input-label">
              Name*
              <span id="register-name-error" className={emailErrorClassName}></span>
            </label>
            <input
              type="text"
              id="register-name"
              name="register-name"
              placeholder="Terry"
              className="form__input"
              value={name}
              minLength="2"
              onChange={handleInputChange}
              required
              autoFocus
            />
          </div>

          <div className="form__input-container">
            <label htmlFor="register-avatar" className="form__input-label">
              Avatar
              <span id="register-avatar-error" className={passwordErrorClassName}></span>
            </label>
            <input
              type="url"
              id="register-avatar"
              name="register-avatar"
              placeholder="https://unsplash.com/random"
              className="form__input"
              value={avatar}
              onChange={handleInputChange}
            />
          </div>

          <div className="form__button-grp">
            <button
              type="submit"
              className={submitButtonClassName}
              disabled={!isFormValid}
              aria-label="Log in"
            >
              Next
            </button>
            <p>or</p>
            <button type="button" className="form__secondary-button" aria-label="Register">
              Login
            </button>
          </div>
        </>
      )}

      {preferencesOpen && (
        <>
          <p className="preferences__text">
            Choose clothes you wear, so we can recommend what's right for you
          </p>

          <div className="preferences__buttons">
            {clothingItems.map((item) => (
              <ClothingSelectorButton
                item={item}
                key={item.value}
                onItemSelect={handleItemSelect}
                clothingPreferences={clothingPreferences}
              />
            ))}
          </div>

          <div className="form__button-grp">
            <button
              type="submit"
              className={submitButtonClassName}
              disabled={!isFormValid}
              aria-label="Log in"
            >
              Register
            </button>
            <p>or</p>
            <button type="button" className="form__secondary-button" aria-label="Register">
              Login
            </button>
          </div>
        </>
      )}
    </ModalWithForm>
  );
};

export default Register;