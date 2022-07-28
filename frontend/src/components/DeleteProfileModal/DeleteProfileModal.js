import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

/**
 * The **DeleteProfileModal** component representing form to delete user's profile .
 *
 * @author [Nuriya](https://github.com/NuriyaAkh)
 */

const DeleteProfileModal = ({ isOpen, onClose, onDeleteProfile }) => {
  // Event Handlers
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onDeleteProfile();
    onClose();
  };

  const handleCancelClick = () => onClose();

  return (
    <ModalWithForm
      formTitle=""
      name="delete-profile"
      position="middle"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <div className="form">
        <label className="form__title">Are you sure you want to delete your profile?</label>
        <p className="form__text">
          This action is irreversible: all your data will be lost and you will not be able to
          restore your profile later.
        </p>
      </div>

      <div className="form__button-grp">
        <button type="submit" className="form__delete-button" aria-label="Delete">
          Delete profile
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          className="form__secondary-button"
          aria-label="Cancel"
        >
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
};

DeleteProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteProfile: PropTypes.func.isRequired,
};
export default DeleteProfileModal;
