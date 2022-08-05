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

const ModalWithForm = React.forwardRef((props, ref) => {
  const { formTitle, name, position, width, isOpen, onClose, onSubmit, onChange, children } = props;

  return (
    <Modal {...{ name, position, width, isOpen, onClose }}>
      <form
        className="form"
        name={name}
        action="#"
        ref={ref}
        onSubmit={onSubmit}
        onChange={onChange}
        noValidate
      >
        <h2 className="form__title">{formTitle}</h2>
        {children}
      </form>
    </Modal>
  );
});

ModalWithForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['middle', 'top-right']),
  width: PropTypes.oneOf(['normal', 'wide']),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default ModalWithForm;
