import React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import PropTypes from 'prop-types';
/**
 * The **CreateClothingModal** component will let users add new clothes to the database.
 * It uses the ModalWithForm component.
 *
 *  @author [Peter Staal](https://github.com/pstaal)
 */

 const CreateClothingModal = () => {
   
    const [isOpen, setIsOpen] = React.useState(true);
    
    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = () => {

    };

    return (
        <ModalWithForm formTitle="New garment" name="add-clothes" position="middle" width="normal" isOpen={isOpen} onClose={closeModal} onSubmit={handleSubmit} submitButtonLabel="Add garment">

        </ModalWithForm>
    )
 };


 export default CreateClothingModal;