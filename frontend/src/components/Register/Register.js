import './Register.css';
import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import ClothingSelectorButton from '../ClothingSelectorButton/ClothingSelectorButton';
import { clothingItems } from '../../utils/formConstants';

/**
 * The **Login** component representing user authorization or login form.
 *
 * @author [Devin](https://github.com/mentalcaries)
 */

const Register = ({ isOpen, onClose, onSubmit }) => {
  const [credentialsOpen, setCredentialsOpen] = useState(isOpen);
  const [personalInfoOpen, setPersonalInfoOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [clothingPreferences, setClothingPreferences] = useState([]);

  const { isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'register-email',
    'register-pwd',
    'confirm-pwd',
    'register-name',
  ]);

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
  React.useEffect(() => {
    const initialValues = {
      'register-email': '',
      'register-password': '',
      'confirm-password': '',
    };
    setRegisterEmail('');
    setRegisterPassword('');
    setConfirmPassword('');
    resetForm({ ...initialValues }, { ...initialValues }, true);
  }, [resetForm, setRegisterEmail, setRegisterPassword, setConfirmPassword]);

  const handleInputChange = (event) => {
    if (event.target.name === 'register-email') {
      setRegisterEmail(event.target.value);
    }
    if (event.target.name === 'register-pwd') {
      setRegisterPassword(event.target.value);
    }
    if (event.target.name === 'confirm-pwd') {
      setConfirmPassword(event.target.value);
    }
    if (event.target.name === 'register-name') {
      setName(event.target.value);
    }
    if (event.target.name === 'register-avatar') {
      setAvatar(event.target.value);
    }
    handleChange(event);
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

  // const registerFormSubmit = (event) => {
  //   // event.preventDefault()
  //   (credentialsOpen || personalInfoOpen) && handleNext(event);

  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      registerEmail,
      registerPassword,
      name,
      avatar,
      clothingPreferences,
    });
    onClose();
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
            <label htmlFor="register-pwd" className="form__input-label">
              Password
              <span id="register-pwd-error" className={passwordErrorClassName}></span>
            </label>
            <input
              type="password"
              id="register-pwd"
              name="register-pwd"
              placeholder="Password"
              className="form__input"
              value={registerPassword}
              minLength="8"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form__input-container">
            <label htmlFor="confirm-pwd" className="form__input-label">
              Confirm Password
              <span id="confirm-pwd-error" className={passwordErrorClassName}></span>
            </label>
            <input
              type="password"
              id="confirm-pwd"
              name="confirm-pwd"
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
