import './Modal.css';
import PropTypes from 'prop-types';

/**
 * The **Modal** component is the base of all the modals in the web app.
 *
 * @author [Shraddha](https://github.com/5hraddha)
 */
const Modal = ({ name, position, width, isOpen, onClose, children }) => {
  const modalPositionClass = (position === 'middle')
    ? `modal_position_middle`
    : `modal_position_top-right`;

  const modalContainerWidthClass = (width === 'normal')
    ? `modal__container_width_normal`
    : `modal__container_width_wide`;

  return (
    <div className={`modal modal_rel_${name} ${modalPositionClass} ${isOpen && 'modal_opened'}`}>
      <div className={`modal__container ${modalContainerWidthClass}`}>
        {children}
        <button className={`modal__close-btn ${(width === 'wide') && `modal__close-btn_wide`}`} type="button" aria-label="Close modal" onClick={onClose} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['middle', 'top-right']),
  width: PropTypes.oneOf(['normal', 'wide']),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any,
}

export default Modal;
