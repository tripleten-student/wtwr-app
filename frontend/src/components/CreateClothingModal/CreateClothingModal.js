import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import PropTypes from 'prop-types';
import './CreateClothingModal.css'

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
            <p className="modal__input-label">Type</p>
            <div className="modal__select-container">
                <div  className="modal__input modal__dropdown-input">Choose</div>
                </div>
                    <ul>
                        <li>Tops & Outerwear</li>
                        <li>Bottoms</li>
                        <li>Accessories</li>
                        <li>Shoes</li>
                    </ul>
          
            <p className="modal__input-label">Weather</p>
            <div className="modal__select-container">
                <div  className="modal__input modal__dropdown-input">Choose</div>
                </div>
                    <ul>
                        <li>Cold (30° F)</li>
                        <li>Moderate (50° F)</li>
                        <li>Hot (70° F)</li>
                    </ul>
                
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