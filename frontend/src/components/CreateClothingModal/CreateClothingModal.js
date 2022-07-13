import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import PropTypes from 'prop-types';
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
            <label for="name">Name</label>
            <input type="text" name="name" placeholder="Name"/>
            <label for="type">Type</label>
            <select name="type">
                <option value="" disabled selected hidden>Choose</option>
                <option value="tops">Tops & Outerwear</option>
                <option value="bottoms">Bottoms</option>
                <option value="accessories">Accessories</option>
                <option value="shoes">Shoes</option>
            </select>
            <label for="weather">Weather</label>
            <select name="weather">
                <option value="" disabled selected hidden>Choose</option>
                <option value="cold">Cold (30° F)</option>
                <option value="moderate">Moderate (50° F)</option>
                <option value="hot">Hot (70° F)</option>
            </select>
            <label for="image">Image</label>
            <input type="text" name="image" placeholder="Image URL"/>
        </ModalWithForm>
    )
 };


 export default CreateClothingModal;