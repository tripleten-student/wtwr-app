import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import PropTypes from 'prop-types';
import './CreateClothingModal.css'

/**
 * The **ClothingModal** component will let users add new clothes to the database or update existing clothes.
 * It uses the ModalWithForm component and expects a handleSubmit function that either triggers a POST or PUT method. It also
 * expects a clothes object, by default this is set to Null. If there is a clothes object it will use that to prepoulate all the fields (in the edit version of the component)
 *
 *  @author [Peter Staal](https://github.com/pstaal)
 */

 const ClothingModal = ({isOpen, onClose, clothes, handleSubmit}) => {

    const [image, setImage] = React.useState('');
    const [clothing, setClothing] = React.useState(clothes ? clothes.type : 'Choose');
    const [isWeatherMenuOpen, setIsWeatherMenuOpen] = React.useState(false);
    const [isClothingMenuOpen, setIsClothingMenuOpen] = React.useState(false);
    const [name, setName] = React.useState(clothes ? clothes.name : '');
    const [imageUrl, setImageUrl ] = React.useState(clothes ? clothes.imageUrl : '');
    const [weather, setWeather] = React.useState(clothes ? clothes.weather : 'Choose');


    const handleImageClick = () => {
        setImage("");
    }

    const handleImageChange = (e) => {
        const myImage = new Image();
        myImage.src = e.target.value;
        myImage.onerror = function () {
            setImage("");
        };

        setImage(e.target.value);
        setImageUrl(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const selectClothes = (e) => {
        console.log(document.querySelector("#modal__dropdown-clothing").style.color)
        if (document.querySelector("#modal__dropdown-clothing").style.color !== '#000'){
            document.querySelector("#modal__dropdown-clothing").style.color = "#000";
        }
        setClothing(e.target.textContent);
        toggleClothingMenu();    
    }

    const selectWeather = (e) => {
        if (document.querySelector("#modal__dropdown-weather").style.color !== '#000'){
            document.querySelector("#modal__dropdown-weather").style.color = "#000";
        }
        setWeather(e.target.textContent);
        toggleWeatherMenu();
    }

    const toggleClothingMenu = () => {
        setIsClothingMenuOpen(!isClothingMenuOpen);
    }

    const toggleWeatherMenu = () => {
        setIsWeatherMenuOpen(!isWeatherMenuOpen);
    }

    return (
        <ModalWithForm formTitle="New garment" name="add-clothes" position="middle" width="normal" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} submitButtonLabel="Add garment">
            <label className="modal__input-label" htmlFor="name">Name</label>
            <input className="modal__input" type="text" name="name" id="name" placeholder="Name" required value={name} onChange={handleNameChange}/>
            <p className="modal__input-label">Type</p>
            <div className="modal__select-container">
                <div onClick={toggleClothingMenu} id="modal__dropdown-clothing" className="modal__input modal__dropdown-input">{clothing}</div>
            </div>
                {isClothingMenuOpen && 
                <div className="modal__dropdown-container">
                    <ul className="modal__dropdown-list">
                        <li onClick={selectClothes} className="modal__dropdown-item">Tops & Outerwear</li>
                        <li onClick={selectClothes} className="modal__dropdown-item">Bottoms</li>
                        <li onClick={selectClothes} className="modal__dropdown-item">Accessories</li>
                        <li onClick={selectClothes} className="modal__dropdown-item">Shoes</li>
                    </ul>
                </div>
                }
            <p className="modal__input-label">Weather</p>
            <div className="modal__select-container">
                <div  onClick={toggleWeatherMenu} id="modal__dropdown-weather" className="modal__input modal__dropdown-input">{weather}</div>
            </div>
               {isWeatherMenuOpen &&
                <div className="modal__dropdown-container">
                    <ul className="modal__dropdown-list">
                        <li onClick={selectWeather} className="modal__dropdown-item">Cold (30° F)</li>
                        <li onClick={selectWeather} className="modal__dropdown-item">Moderate (50° F)</li>
                        <li onClick={selectWeather} className="modal__dropdown-item">Hot (70° F)</li>
                    </ul>
                </div>
               }
            <label className="modal__input-label" htmlFor="image">Image</label>
            <input className="modal__input" type="text" name="image" id="image" placeholder="Image URL" value={imageUrl} onChange={handleImageChange} required/>
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

ClothingModal.defaultProps = {
   clothes: null
  };

ClothingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    clothes: PropTypes.object
};

 export default ClothingModal;