import React from 'react';
import Modal from '../Modal/Modal';
import './ModalWithForm.css';
import PropTypes from 'prop-types';
/**
 * The **ModalWithForm** component is the base component that could be used to create any modal that has form in it.
 * For example - <EditPasswordModal />, <EditProfileDataModal />, <EditPreferencesModal />, etc.
 *
 *  @author [Nuriya](https://github.com/NuriyaAkh)
 */

const ModalWithForm = ({ formTitle, name, position, width, onSubmit, submitButtonLabel, children }) => {
  const formRef = React.createRef();
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    setIsFormValid(formRef.current.checkValidity());
  }, [isOpen, formRef]);

  const handleChange = () => {
    setIsFormValid(formRef.current.checkValidity());
  }

  const submitButtonClassName = `form__save-button form__save-button_rel_${name} ${!isFormValid && 'form__save-button_disabled'}`;

  return (
    <Modal {...{ name, position, width }}>
      <form
        className="form"
        name={name}
        action="#"
        ref={formRef}
        onSubmit={onSubmit}
        onChange={handleChange}
        noValidate>
        <h2 className="form__title">{formTitle}</h2>
        {children}
        <button type="submit" className={submitButtonClassName} disabled={!isFormValid} aria-label={`${submitButtonLabel} ${name}`}>
          {submitButtonLabel}
        </button>
      </form>
    </Modal>
  );
};

ModalWithForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['middle', 'top-right']),
  width: PropTypes.oneOf(['normal', 'wide']),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default ModalWithForm;