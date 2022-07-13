import React from 'react';
import './App.css';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import WeatherCards from '../WeatherCards/WeatherCards';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import { determineTimeOfTheDay } from '../../utils/weatherCards';
import CreateClothingModal from '../CreateClothingModal/CreateClothingModal';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

/**
 * The main React **App** component.
 */
const App = () => {
  // Replace the below state with specific Modal e.g. isCreateClothingModalOpen, setIsCreateClothingModalOpen
  const [isModalWithFormOpen, setIsModalWithFormOpen] = React.useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState('F');

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
  const isAnyPopupOpen = (isModalWithFormOpen);
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
    setIsModalWithFormOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  }

  return (
    <div className="page">
      <div className="page__wrapper">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          App
          {/* Replace the ModalWithForm below with specific modals */}
          {/* <ModalWithForm
            formTitle="Edit garment"
            name="edit-garment"
            position="top-right"
            width="normal"
            isOpen={isModalWithFormOpen}
            onClose={closeAllPopups}
            onSubmit={handleSubmit}
            submitButtonLabel="Update garment"
          >

          </ModalWithForm> */}

          <CreateClothingModal isOpen={isModalWithFormOpen} onClose={closeAllPopups}/>
          <WeatherCards timeOfTheDay={timeOfTheDay} description="Data from Weather API" />
          <Main />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
};

export default App;