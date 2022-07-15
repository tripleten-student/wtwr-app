import './Register.css';
import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

const Register = ({ isOpen, onClose, onSubmit }) => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'register-email',
    'register-pwd',
    'confirm-pwd'
  ]);

  const formRef = React.useRef(null);
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    setIsFormValid(formRef.current.checkValidity());
  }, [isOpen, formRef]);

  const handleFormChange = () => {
    console.log(registerPassword)
    console.log(confirmPassword)
    setIsFormValid(formRef.current.checkValidity());
  };

  // Reset form values every time the popup opens
  React.useEffect(() => {
    const initialValues = {
      'register-email': '',
      'register-password': '',
      'confirm-password':''
    };
    setRegisterEmail('');
    setRegisterPassword('');
    setConfirmPassword('')
    resetForm({ ...initialValues }, { ...initialValues }, true);
  }, [resetForm, setRegisterEmail, setRegisterPassword, setConfirmPassword]);

  const handleInputChange = (e) => {
    if (e.target.name === 'register-email') {
      setRegisterEmail(e.target.value);
    }
    if (e.target.name === 'register-pwd') {
      setRegisterPassword(e.target.value);
    }
    if (e.target.name === 'confirm-pwd') {
      setConfirmPassword(e.target.value);
    }
    handleChange(e);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isValid || (registerEmail && registerPassword === confirmPassword)) {
      onSubmit({ registerEmail, registerPassword });
    }
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
      ref={formRef}
      formTitle="Sign up"
      name="register"
      position="top-right"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => {}}
      onChange={handleFormChange}
    >
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
          aria-label="Log in"
        >
          Next
        </button>
        <p>or</p>
        <button type="button" className="form__secondary-button" aria-label="Register">
          Login
        </button>
      </div>
    </ModalWithForm>
  );
};

export default Register;

// ModalWithForm.propTypes = {
//   formTitle: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   position: PropTypes.oneOf(['middle', 'top-right']),
//   width: PropTypes.oneOf(['normal', 'wide']),
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   children: PropTypes.any,
// };
