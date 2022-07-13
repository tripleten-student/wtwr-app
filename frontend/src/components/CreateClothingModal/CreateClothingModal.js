import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import PropTypes from 'prop-types';
import '../../blocks/modal/__input/modal__input.css';
import '../../blocks/modal/__input-label/modal__input-label.css';
import '../../blocks/modal/__select/modal__select.css';
import '../../blocks/modal/__select-container/modal__select-container.css';
import '../../blocks/modal/__image/modal__image.css';
import '../../blocks/modal/__image-button/modal__image-button.css';
import '../../blocks/modal/__image-container/modal__image-container.css';

/**
 * The **CreateClothingModal** component will let users add new clothes to the database.
 * It uses the ModalWithForm component.
 *
 *  @author [Peter Staal](https://github.com/pstaal)
 */

 const CreateClothingModal = ({isOpen, onClose}) => {

    const [image, setImage] = React.useState('');

    const handleSubmit = () => {

    };

    const handleImageClick = () => {
        setImage("");
    }

    const handleChange = (e) => {
        const myImage = new Image();
        myImage.src = e.target.value;
        myImage.onerror = function () {
            setImage("");
        };

        setImage(e.target.value);
    };

    return (
        <ModalWithForm formTitle="New garment" name="add-clothes" position="middle" width="normal" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} submitButtonLabel="Add garment">
            <label className="modal__input-label" htmlFor="name">Name</label>
            <input className="modal__input" type="text" name="name" id="name" placeholder="Name" required/>
            <label className="modal__input-label" htmlFor="type">Type</label>
            <div className="modal__select-container">
                <select name="type" id="type" required className="modal__select">
                    <option value="" disabled selected hidden>Choose</option>
                    <option value="tops">Tops & Outerwear</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="accessories">Accessories</option>
                    <option value="shoes">Shoes</option>
                </select>
            </div>
            <label className="modal__input-label" htmlFor="weather">Weather</label>
            <div className="modal__select-container">
                <select name="weather" id="weather" required className="modal__select">
                    <option value="" disabled selected hidden>Choose</option>
                    <option value="cold">Cold (30° F)</option>
                    <option value="moderate">Moderate (50° F)</option>
                    <option value="hot">Hot (70° F)</option>
                </select>
            </div>
            <label className="modal__input-label" htmlFor="image">Image</label>
            <input className="modal__input" type="text" name="image" id="image" placeholder="Image URL" onChange={handleChange} required/>
            {image && (
                <div className="modal__image-container">
                    <img alt="" className="modal__image" src={image} />
                    <button className="modal__image-button" onClick={handleImageClick}></button>
                </div>
                )
                }
        </ModalWithForm>
    )
 };


 export default CreateClothingModal;