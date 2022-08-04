import './Register.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import ClothingSelectorButton from '../ClothingSelectorButton/ClothingSelectorButton';
import { clothingItems } from '../../utils/formConstants';

/**
 * The **Register** component for user sign up and submission to the backend.
 *
 * @author [Devin](https://github.com/mentalcaries)
 */

const Register = ({ isOpen, onClose, onSubmit, openLoginModal }) => {
  const [credentialsOpen, setCredentialsOpen] = useState(true);
  const [personalInfoOpen, setPersonalInfoOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [clothingPreferences, setClothingPreferences] = useState([]);

  const { values, isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'register-email',
    'register-password',
    'confirm-password',
    'register-name',
    'register-avatar',
  ]);

  const {
    'register-email': registerEmail,
    'register-password': registerPassword,
    'confirm-password': confirmPassword,
    'register-name': name,
    'register-avatar': avatar,
  } = values;

  const credentialsRef = useRef(null);
  const personalInfoRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(registerPassword === confirmPassword && credentialsRef.current.checkValidity());
  }, [isOpen, credentialsRef, registerPassword, confirmPassword]);

  const handleFormChange = () => {
    credentialsRef.current?.name && setIsFormValid(credentialsRef.current.checkValidity());
    personalInfoRef.current?.name && setIsFormValid(personalInfoRef.current.checkValidity());
  };

  const initialValues = {
    'register-email': '',
    'register-password': '',
    'confirm-password': '',
    'register-name': '',
    'register-avatar': '',
  };

  const handleInputChange = (event) => handleChange(event);

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
      : setClothingPreferences([...clothingPreferences, selection]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      email: registerEmail,
      password: registerPassword,
      name,
      avatar,
      preferences: clothingPreferences,
    });
    resetModal();
  };

  const resetModal = useCallback(() => {
    resetForm({ ...initialValues }, { ...initialValues }, true);
    setClothingPreferences([]);
    setPreferencesOpen(false);
    setPersonalInfoOpen(false);
    setCredentialsOpen(true);
  }, []);

  useEffect(() => {
    resetModal();
  }, [onClose, resetModal]);

  // Set form elements classnames
  const setInputLabelClassName = (name, isRequired) =>
    `form__input-label ${isRequired && `form__input-label_required`} ${
      !isValid && errors[name] && `form__input-label_error`
    }`;
  const setInputClassName = (name) =>
    `form__input ${!isValid && errors[name] && `form__input_error`}`;
  const setErrorClassName = (name) =>
    `form__error ${!isValid && errors[name] && `form__error_visible`}`;

  const submitButtonClassName = `form__submit-button ${
    !isFormValid && 'form__submit-button_disabled'
  } `;

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
            <div className="form__input-label-container">
              <label
                htmlFor="register-email"
                className={setInputLabelClassName('register-email', true)}
              >
                Email
              </label>
              <p id="register-email-error" className={setErrorClassName('register-email')}>
                {errors['register-email'] && '(this is not a valid email address)'}
              </p>
            </div>
            <input
              type="email"
              id="register-email"
              name="register-email"
              placeholder="Email"
              className={setInputClassName('register-email')}
              value={registerEmail}
              onChange={handleInputChange}
              required
              autoFocus
            />
          </div>
          <div className="form__input-container">
            <div className="form__input-label-container">
              <label
                htmlFor="register-password"
                className={setInputLabelClassName('register-password', true)}
              >
                Password
              </label>
              <p id="register-password-error" className={setErrorClassName('register-password')}>
                {errors['register-password'] && '(this is not a valid password)'}
              </p>
            </div>
            <input
              type="password"
              id="register-password"
              name="register-password"
              placeholder="Password"
              className={setInputClassName('register-password')}
              value={registerPassword}
              minLength="8"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form__input-container">
            <div className="form__input-label-container">
              <label
                htmlFor="confirm-password"
                className={setInputLabelClassName('confirm-password', true)}
              >
                Confirm Password
              </label>
              <p id="confirm-password-error" className={setErrorClassName('confirm-password')}>
                {errors['confirm-password'] && '(this is not a valid password)'}
              </p>
            </div>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Password"
              className={setInputClassName('confirm-password')}
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
            <button
              onClick={openLoginModal}
              type="button"
              className="form__secondary-button"
              aria-label="Login"
            >
              Log in
            </button>
          </div>
        </>
      )}

      {personalInfoOpen && (
        <>
          <div className="form__input-container">
            <div className="form__input-label-container">
              <label
                htmlFor="register-name"
                className={setInputLabelClassName('register-name', true)}
              >
                Name
              </label>
              <p id="register-name-error" className={setErrorClassName('register-name')}>
                {errors['register-name'] && '(this is not a valid name)'}
              </p>
            </div>
            <input
              type="text"
              id="register-name"
              name="register-name"
              placeholder="Name"
              className={setInputClassName('register-name')}
              value={name}
              minLength="2"
              onChange={handleInputChange}
              required
              autoFocus
            />
          </div>

          <div className="form__input-container">
            <div className="form__input-label-container">
              <label
                htmlFor="register-avatar"
                className={setInputLabelClassName('register-avatar', false)}
              >
                Avatar
              </label>
              <p id="register-avatar-error" className={setErrorClassName('register-avatar')}>
                {errors['register-avatar'] && '(this is not a valid url)'}
              </p>
            </div>
            <input
              type="url"
              id="register-avatar"
              name="register-avatar"
              placeholder="https://unsplash.com/random"
              className={setInputClassName('register-avatar')}
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
            <button
              onClick={openLoginModal}
              type="button"
              className="form__secondary-button"
              aria-label="Register"
            >
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
            <button
              onClick={openLoginModal}
              type="button"
              className="form__secondary-button"
              aria-label="Register"
            >
              Login
            </button>
          </div>
        </>
      )}
    </ModalWithForm>
  );
};

export default Register;
