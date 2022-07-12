import React from 'react';
import './App.css';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import WeatherCards from '../WeatherCards/WeatherCards';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import { determineTimeOfTheDay } from '../../utils/weatherCards';
import Modal from '../Modal/Modal';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

/**
 * The main React **App** component.
 */
const App = () => {
  // Replace the below state with specific Modal e.g. isCreateClothingModalOpen, setIsCreateClothingModalOpen
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState('F');
  const[isModalWithFormOpen, setIsModalWithFormOpen] = React.useState(true);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  // not using state here, assuming the time only gets read every time user refreshes the page
  const currentHour = new Date().getHours();
  const timeOfTheDay = determineTimeOfTheDay(currentHour);

  // Handle mouse click or Esc key down event
  //Check if all the other modals are open using || operator
   const isAnyPopupOpen = (isModalOpen);
  //const isAnyPopupOpen = (isModalWithFormOpen);
  React.useEffect(() => {
    const handleClickClose = e => {
      if (e.target.classList.contains('modal_opened')) {
        closeAllPopups();
      }
    }

    const handleEscClose = e => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isAnyPopupOpen) {
      document.addEventListener("click", handleClickClose);
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("click", handleClickClose);
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [isAnyPopupOpen]);

  const closeAllPopups = () => {
    //Remove the code below & set modal's specific setState function to false
    setIsModalOpen(false);
    setIsModalWithFormOpen(false);
  }
  const handleChange = ()=>{
    console.log("hi");
  }
  const handleSubmit =(e) =>{
    e.preventDefault();
  }

  return (
    <div className="page">
      <div className="page__wrapper">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          App
          {/* Replace the Modal below with specific modals */}
          <Modal
            name="test"
            position="middle"
            width="wide"
            isOpen={isModalOpen}
            onClose={closeAllPopups}
          />
          <ModalWithForm
          
          isOpen={isModalWithFormOpen}
          onClose={closeAllPopups}
          onUpdate={handleChange}
          onSubmit={handleSubmit}
          buttonLabel="test save"
          title="Test form title"
          />

          <WeatherCards timeOfTheDay={timeOfTheDay} description="Data from Weather API" />
          <Main />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
};

export default App;
