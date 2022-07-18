import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import '../ModalWithForm/ModalWithForm.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import PropTypes from 'prop-types';
/**
 * The **EditProfileDataModal** component representing form to change profile name and avatar.
 *
 * @author [Nuriya](https://github.com/NuriyaAkh)
 */
const EditProfileDataModal = ({
  isOpen,
  onClose,
  onUpdate,
  // userName,
  // avatarLink,
  currentUser,
 // setAvatarLink,
  //setUserName,
}) => {
  const [userName, setUserName] = React.useState('');
  const [avatarLink, setAvatarLink] = React.useState('');
  const { isValid, errors, handleChange } = useFormAndValidation(['userName', 'avatar-url']);
  const formRef = React.useRef();
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    if (currentUser) {
      setAvatarLink(currentUser.avatar);
      setUserName(currentUser.name);
    }
  }, [currentUser]);

  React.useEffect(() => {
    setIsFormValid(formRef.current.checkValidity());
  }, [isOpen, formRef]);

  const handleInputChange = (event) => {
   
    if (event.target.name === 'userName') {
      setUserName(event.target.value);
    }
    if (event.target.name === 'avatar-url') {
      setAvatarLink(event.target.value);
    }
    handleChange(event);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onUpdate({
      username:userName,
      avatar:avatarLink,
    });
  };
  const handleFormChange = () => {
    setIsFormValid(formRef.current.checkValidity());
  };
  const userNameErrorClassName = ``;
  const avatarLinkErrorClassName = ``;
  const submitButtonClassName = `form__submit-button form__submit-button_rel_login ${
    !isFormValid && 'form__submit-button_disabled'
  }`;

  return (
    <ModalWithForm
      ref={formRef}
      formTitle="Change profile data"
      name="profileData"
      position="middle"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
      buttonLabel="Save changes"
    >
      <div className="form__input-container">
        <label htmlFor="userName" className="form__input-label">
          Name*
          <span id="userName-error" className={userNameErrorClassName}></span>
        </label>

        <input
          type="text"
          id="userName"
          name="userName"
          placeholder="Name"
          className="form__input"
          value={userName || ' '}
          onChange={handleInputChange}
          minLength="2"
          maxLength="40"
          required
        />
      </div>

      <div className="form__input-container">
        <label htmlFor="userAvatar" className="form__input-label">
          Avatar
          <span id="userAvatar-error" className={avatarLinkErrorClassName}></span>
        </label>
        <input
          type="URL"
          id="avatar-url"
          name="avatar-url"
          placeholder="Avatar URL"
          className="form__input"
          value={avatarLink || ' '}
          onChange={handleInputChange}
          required
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
export default EditProfileDataModal;
