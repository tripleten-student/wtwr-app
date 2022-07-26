import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import Dropdown from '../Dropdown/Dropdown';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { checkIfImageExists } from '../../utils/clothingModals';
import { clothingItems, weatherTypes } from '../../utils/formConstants';


/**
 * The **EditClothingModal** component will let users add new clothes to the database.
 *
 *  @author [Nuriya](https://github.com/NuriyaAkh)
 */
const EditClothingModal = ({ isOpen, onClose, onSubmitEditGarment }) => {
  // Component states & ref
  const formRef = useRef();
  const [isFormValid, setIsFormValid] = useState(false);
  const [garmentTypeChoice, setGarmentTypeChoice] = useState('');
  const [weatherTypeChoice, setWeatherTypeChoice] = useState('');
  const [isImageUrlExist, setIsImageUrlExist] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(true);

  const { values, isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'new-garment-name',
    'new-garment-image-url',
  ]);

  // Set the validity of the form
  useEffect(() => {
    setIsFormValid(formRef.current.checkValidity() && garmentTypeChoice !== '' && weatherTypeChoice !== '');
  }, [isOpen, formRef, garmentTypeChoice, weatherTypeChoice]);

  // Reset form values every time the popup opens
  useEffect(() => {
    const initialValues = {
      //current selection of the garment?
      'new-garment-name': '',
      'new-garment-image-url': '',
    };
    const initialErrorValues = {
      'new-garment-name': '',
      'new-garment-image-url': '',
    };
    resetForm({ ...initialValues }, { ...initialErrorValues }, true);
  }, [isOpen, resetForm]);

  const handleCloseImagePreviewButtonClick = () => setShowImagePreview(false);

  const handleInputChange = (event) => {
    if (event.target.name === 'new-garment-image-url') {
      checkIfImageExists(event.target.value, (exists) => {
        if (exists) {
          setIsImageUrlExist(true);
        } else {
          setIsImageUrlExist(false);
        }
      });
    }
    handleChange(event);
  };

  const handleFormChange = () => {
    setIsFormValid(formRef.current.checkValidity() && garmentTypeChoice !== '' && weatherTypeChoice !== '');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // naming of the fields to be checked again when backend API is connected
    if (isValid) {
      onSubmitEditGarment(
        values['new-garment-name'],
        garmentTypeChoice,
        weatherTypeChoice,
        values['new-garment-image-url']
      );
      onClose();
    }
  };
  const handleCancelClick = () => {
    onClose();
  };
  const garmentNameErrorClassName = ``;
  const garmentImageErrorClassName = ``;
  const submitButtonClassName = `form__submit-button ${!isFormValid && 'form__submit-button_disabled'}`;

  return (
    <ModalWithForm
      formTitle="New garment"
      name="add-clothes"
      position="middle"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
      ref={formRef}
    >
      <div className="form__input-container">
        <label htmlFor="new-garment-name" className="form__input-label">
          Name
          <span id="new-garment-name-error" className={garmentNameErrorClassName}></span>
        </label>
        <input
          type="text"
          id="new-garment-name"
          name="new-garment-name"
          placeholder="Name"
          className="form__input"
          value={values['new-garment-name']}
          onChange={handleInputChange}
          minLength="2"
          maxLength="40"
          required
        />
      </div>
      <div className="form__dropdown-container">
        <Dropdown
          dropdownName="garment-types"
          header="Type"
          options={clothingItems}
          onDropdownItemClick={setGarmentTypeChoice} />
      </div>
      <div className="form__dropdown-container">
        <Dropdown
          dropdownName="weather-types"
          header="Weather"
          options={weatherTypes}
          onDropdownItemClick={setWeatherTypeChoice} />
      </div>
      <div className="form__input-container">
        <label htmlFor="garmentimage" className="form__input-label">
          Image
          <span id="garmentimage-error" className={garmentImageErrorClassName}></span>
        </label>
        <input
          type="url"
          id="new-garment-image-url"
          name="new-garment-image-url"
          placeholder="Image URL"
          className="form__input"
          value={values['new-garment-image-url']}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* If Image URL actully exists & there is no validation error, then display preview */}
      {/* {(showImagePreview && isImageUrlExist && !errors['new-garment-image-url']) && (
        <div className="form__image-preview-container">
          <img src={values['new-garment-image-url']} alt="new garment" className="form__image-preview" />
          <button className="form__image-preview-close" type="button" aria-label="Close image preview" onClick={handleCloseImagePreviewButtonClick} />
        </div>
      )} */}
      <div className="form__button-grp">
        <button
          type="submit"
          className={submitButtonClassName}
          disabled={!isFormValid}
          aria-label="Update garment"
        >
          Update garment
        </button>
        <button type="button" className="form__secondary-button" aria-label="Cancel" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
};

EditClothingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitEditGarment: PropTypes.func.isRequired,
};

export default EditClothingModal;
