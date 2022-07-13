import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import PropTypes from 'prop-types';
import '../../blocks/modal/__input/modal__input.css';
import '../../blocks/modal/__input-label/modal__input-label.css'
/**
 * The **CreateClothingModal** component will let users add new clothes to the database.
 * It uses the ModalWithForm component.
 *
 *  @author [Peter Staal](https://github.com/pstaal)
 */

 const CreateClothingModal = ({isOpen, onClose}) => {

    const handleSubmit = () => {

    };

    return (
        <ModalWithForm formTitle="New garment" name="add-clothes" position="middle" width="normal" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} submitButtonLabel="Add garment">
            <label className="modal__input-label" for="name">Name</label>
            <input className="modal__input" type="text" name="name" placeholder="Name" required/>
            <label className="modal__input-label" for="type">Type</label>
            <select name="type" required>
                <option value="" disabled selected hidden>Choose</option>
                <option value="tops">Tops & Outerwear</option>
                <option value="bottoms">Bottoms</option>
                <option value="accessories">Accessories</option>
                <option value="shoes">Shoes</option>
            </select>
            <label className="modal__input-label" for="weather">Weather</label>
            <select name="weather" required>
                <option value="" disabled selected hidden>Choose</option>
                <option value="cold">Cold (30° F)</option>
                <option value="moderate">Moderate (50° F)</option>
                <option value="hot">Hot (70° F)</option>
            </select>
            <label className="modal__input-label" for="image">Image</label>
            <input className="modal__input" type="text" name="image" placeholder="Image URL" required/>
        </ModalWithForm>
    )
 };


 export default CreateClothingModal;