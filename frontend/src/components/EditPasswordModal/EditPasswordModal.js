import React from 'react';
import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

/**
 * The **EditPasswordComponent** component representing form to change user's login password.
 *
 *  @author [Nuriya](https://github.com/NuriyaAkh)
 */

const EditPasswordModal = ({ isOpen, onClose, onUpdatePassword }) => {
  // const currentUser = React.useContext(CurrentUserContext);
  const { values, isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'login-password', 'new-login-password', 'confirm-login-password'
  ]);

  const formRef = React.useRef();
  const [isFormValid, setIsFormValid] = React.useState(false);

  const [password, setPassword] = React.useState('');
  const [newpassword, setNewPassword] = React.useState('');
  const [confirmpassword, setConfirmPassword] = React.useState('');

  React.useEffect(() => {
    setIsFormValid(formRef.current.checkValidity());
  }, [isOpen, formRef]);

  const handleFormChange = () => {
    setIsFormValid(formRef.current.checkValidity());
  };

  // Reset form values every time the popup opens
  React.useEffect(() => {
    const initialValues = {
      password: '',
      newpassword: '',
      confirmpassword: '',
    };
    const initialErrorValues = {
      password: '',
      newpassword: '',
      confirmpassword: '',
    };

    setNewPassword('');
    setConfirmPassword('');
    resetForm({ ...initialValues }, { ...initialErrorValues }, true);
  }, [isOpen, resetForm,setPassword, setNewPassword, setConfirmPassword]);

  const handleInputChange = (event) => {
    if (event.target.name === 'login-password') {
      setPassword(event.target.value);
    }
    if (event.target.name === 'new-login-password') {
      setNewPassword(event.target.value);
    }
    if (event.target.name === 'confirm-login-password') {
      setConfirmPassword(event.target.value);
    }

    handleChange(event);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // naming of the fields to be checked again when backend API is connected
    const { password, newpassword, confirmpassword } = values;
    if (isValid || (newpassword !== password && newpassword === confirmpassword)) {
      onUpdatePassword({confirmpassword });
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
          value={password}
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
          value={newpassword}
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
          value={confirmpassword}
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
