import { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import CurrentUserContext from '../../contexts/CurrentUserContext';

/**
 * The **EditProfileDataModal** component representing form to change profile name and avatar.
 *
 * @author [Nuriya](https://github.com/NuriyaAkh)
 */

const EditProfileDataModal = ({ isOpen, onClose, onUpdateUserProfile }) => {
  const { values, isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'username',
    'avatarurl',
  ]);

  const currentUser = useContext(CurrentUserContext);
  const formRef = useRef();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(formRef.current.checkValidity());
  }, [isOpen, formRef]);

  // Reset form values every time the popup opens
  useEffect(() => {
    const initialInputValues = {
      username: currentUser.username || '',
      avatarurl: currentUser.avatar || '',
    };
    const initialErrorValues = {
      username: '',
      avatarurl: '',
    };
    resetForm({ ...initialInputValues }, { ...initialErrorValues }, true);
  }, [isOpen, resetForm, currentUser]);

  // Event Handlers
  const handleFormChange = () => setIsFormValid(formRef.current.checkValidity());

  const handleInputChange = (event) => handleChange(event);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, avatarurl } = values;
    if (isValid || (username && avatarurl)) {
      // naming of the fields to be checked again when backend API is connected
      onUpdateUserProfile({
        name: username,
        avatar: avatarurl
      });
      onClose();
    }
  };

  // Set form elements classnames
  const setInputLabelClassName = (name, isRequired) =>
    `form__input-label ${isRequired && `form__input-label_required`} ${(!isValid && errors[name]) && `form__input-label_error`}`;
  const setInputClassName = (name) => `form__input ${(!isValid && errors[name]) && `form__input_error`}`;
  const setErrorClassName = (name) => `form__error ${(!isValid && errors[name]) && `form__error_visible`}`;
  const submitButtonClassName = `form__submit-button ${!isFormValid && 'form__submit-button_disabled'}`;

  return (
    <ModalWithForm
      ref={formRef}
      formTitle="Change profile data"
      name="change-profile-data"
      position="middle"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
    >
      <div className="form__input-container">
        <div className="form__input-label-container">
          <label htmlFor="username" className={setInputLabelClassName('username', true)}>
            Name
          </label>
          <p id="username-error" className={setErrorClassName('username')}>
            {(errors['username']) && '(this is not a valid name)'}
          </p>
        </div>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Name"
          className={setInputClassName('username')}
          value={values.username}
          onChange={handleInputChange}
          minLength="2"
          maxLength="40"
          required
        />
      </div>

      <div className="form__input-container">
        <div className="form__input-label-container">
          <label htmlFor="avatarurl" className={setInputLabelClassName('avatarurl')}>
            Avatar
          </label>
          <p id="avatarurl-error" className={setErrorClassName('avatarurl')}>
            {(errors['avatarurl']) && '(this is not a valid url)'}
          </p>
        </div>
        <input
          type="url"
          id="avatarurl"
          name="avatarurl"
          placeholder="Avatar"
          className={setInputClassName('avatarurl')}
          value={values.avatarurl}
          onChange={handleInputChange}
        />
      </div>

      <div className="form__button-grp">
        <button
          type="submit"
          className={submitButtonClassName}
          disabled={!isFormValid}
          aria-label="Save changes"
        >
          Save changes
        </button>
      </div>
    </ModalWithForm>
  );
};

EditProfileDataModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateUserProfile: PropTypes.func.isRequired,
};
export default EditProfileDataModal;
