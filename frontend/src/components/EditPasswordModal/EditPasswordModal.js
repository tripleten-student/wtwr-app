import React from 'react';
import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

/**
 * The **EditPasswordComponent** component representing form to change user's login password.
 *
 *  @author [Nuriya](https://github.com/NuriyaAkh)
 */

const EditPasswordModal = ({ isOpen, onClose, onUpdatePassword }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'login-password',
  ]);

  const formRef = React.useRef();
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    setIsFormValid(formRef.current.checkValidity());
  }, [isOpen, formRef]);

  const handleFormChange = () => {
    setIsFormValid(formRef.current.checkValidity());
  };
  // const [loginNewPassword, setLoginNewPassword]=React.useState('');

  // Reset form values every time the popup opens
  React.useEffect(() => {
    const initialValues = {
      password: currentUser.password,
    };
    const initialErrorValues = {
      password: '',
    };
    resetForm({ ...initialValues }, { ...initialErrorValues }, true);
  }, [isOpen, resetForm, currentUser]);

  const handleInputChange = (event) => {
    // if (event.target.name === 'login-passrword') {
    //   setLoginPassword(event.target.value);
    // }
    // if (event.target.name === 'login-newPassword') {
    //   setLoginNewPassword(event.target.value);
    // }
    handleChange(event);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { password, newpassword } = values;
    if (isValid || (password && newpassword)) {
      onUpdatePassword({ password: newpassword });
    }
  };

  const passwordErrorClassName = ``;
  const submitWideButtonClassName = `form__submit-button-wide form__submit-button-wide_rel_login ${
    !isFormValid && 'form__submit-button-wide_disabled'
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
          value={values.password}
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
          placeholder="Password"
          className="form__input"
          value={values.password}
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
          placeholder="Password"
          className="form__input"
          value={values.password}
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

export default EditPasswordModal;
