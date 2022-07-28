import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

/**
 * The **Login** component will let users signin to the web application.
 *
 *  @author [Shraddha](https://github.com/5hraddha)
 */
const Login = ({
  isOpen,
  onClose,
  onSubmit,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
}) => {
  const { isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'login-email',
    'login-pwd',
  ]);

  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(formRef.current.checkValidity());
  }, [isOpen, formRef]);

  const handleFormChange = () => {
    setIsFormValid(formRef.current.checkValidity());
  };

  // Reset form values every time the popup opens
  useEffect(() => {
    const initialValues = {
      'login-email': '',
      'login-password': '',
    };
    setLoginEmail('');
    setLoginPassword('');
    resetForm({ ...initialValues }, { ...initialValues }, true);
  }, [resetForm, setLoginEmail, setLoginPassword]);

  const handleInputChange = (e) => {
    if (e.target.name === 'login-email') {
      setLoginEmail(e.target.value);
    }
    if (e.target.name === 'login-pwd') {
      setLoginPassword(e.target.value);
    }
    handleChange(e);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isValid || (loginEmail && loginPassword)) {
      onSubmit({ loginEmail, loginPassword });
    }
  };

  const emailInputClassName = ``;
  const emailErrorClassName = ``;
  const passwordInputClassName = ``;
  const passwordErrorClassName = ``;
  const submitButtonClassName = `form__submit-button form__submit-button_rel_login ${!isFormValid && 'form__submit-button_disabled'
    }`;

  return (
    <ModalWithForm
      ref={formRef}
      formTitle="Log in"
      name="login"
      position="top-right"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
    >
      <div className="form__input-container">
        <label htmlFor="login-email" className="form__input-label">
          Email
          <span id="login-email-error" className={emailErrorClassName}></span>
        </label>
        <input
          type="email"
          id="login-email"
          name="login-email"
          placeholder="Email"
          className="form__input"
          value={loginEmail}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form__input-container">
        <label htmlFor="login-pwd" className="form__input-label">
          Password
          <span id="login-pwd-error" className={passwordErrorClassName}></span>
        </label>
        <input
          type="password"
          id="login-pwd"
          name="login-pwd"
          placeholder="Password"
          className="form__input"
          value={loginPassword}
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
          aria-label="Log in"
        >
          Log in
        </button>
        <p>or</p>
        <button type="button" className="form__secondary-button" aria-label="Register">
          Register
        </button>
      </div>
    </ModalWithForm>
  );
};

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loginEmail: PropTypes.string.isRequired,
  setLoginEmail: PropTypes.func.isRequired,
  loginPassword: PropTypes.string.isRequired,
  setLoginPassword: PropTypes.func.isRequired,
}

export default Login;
