import React from 'react';
import Modal from '../Modal/Modal';
import './ModalWithForm.css';
import '../Modal/Modal.css';
import PropTypes from 'prop-types';
/**
 * The **ModalWithForm** component is the base markup that could be used to create - <EditPasswordModal />, <EditProfileDataModal />, <EditPreferencesModal />, etc.
 *
 * @author
 */

const ModalWithForm = ({ name, title, children, onSubmit, buttonLabel }) => {
  const [isValid, setFormValidity] = React.useState(false);
  const formRef = React.useRef();

  // React.useEffect(() => {
  //   setIsFormValid(formRef.current.checkValidity());
  // }, [isOpen, formRef]);

  const checkFormValidity = () => {
    setFormValidity(formRef.current.checkValidity());
  };

  return (
    <Modal name="form" position="middle" width="normal" isOpen onClose>
      <form
        noValidate
        ref={formRef}
        onChange={checkFormValidity}
        onSubmit={onSubmit}
        name={title}
        className={`modal__form modal__form_role_${name}`}
      >
        <h3 className="modal__form-title">{title}</h3>
        {children}
        <button
          type="submit"
          className={`modal__save-button modal__save-button_role_${name} ${
            !isValid && 'modal__save-button_disabled'
          }`}
          disabled={!isValid}
        >
          {buttonLabel}
        </button>
      </form>
    </Modal>
  );
};
ModalWithForm.propTypes = {
  children: PropTypes.any,
  buttonLabel: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalWithForm;
