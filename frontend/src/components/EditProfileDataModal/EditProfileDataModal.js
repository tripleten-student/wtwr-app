import React from 'react';
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
  const currentUser = React.useContext(CurrentUserContext);

  const { values, isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'username',
    'avatarurl',
  ]);

  const formRef = React.useRef();
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    setIsFormValid(formRef.current.checkValidity());
  }, [isOpen, formRef]);

  const handleFormChange = () => {
    setIsFormValid(formRef.current.checkValidity());
  };

  // Reset form values every time the popup opens
  React.useEffect(() => {
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

  const handleInputChange = (event) => handleChange(event);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, avatar } = values;

    if (isValid || (username && avatar)) {
      // naming of the fields to be checked again when backend API is connected
      onUpdateUserProfile(values);
      onClose();
    }
  };

  const userNameErrorClassName = ``;
  const avatarUrlErrorClassName = ``;
  const submitButtonClassName = `form__submit-button form__submit-button_rel_edit-profile ${
    !isFormValid && 'form__submit-button_disabled'
  }`;

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
        <label htmlFor="username" className="form__input-label">
          Name
          <span id="username-error" className={userNameErrorClassName}></span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Name"
          className="form__input"
          value={values.username}
          onChange={handleInputChange}
          minLength="2"
          maxLength="40"
          required
        />
      </div>

      <div className="form__input-container">
        <label htmlFor="avatarurl" className="form__input-label">
          Avatar
          <span id="avatarurl-error" className={avatarUrlErrorClassName}></span>
        </label>
        <input
          type="url"
          id="avatarurl"
          name="avatarurl"
          placeholder="Avatar"
          className="form__input"
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
