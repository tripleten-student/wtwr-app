import React from 'react';
import './App.css';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import WeatherCards from '../WeatherCards/WeatherCards';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import { determineTimeOfTheDay } from '../../utils/weatherCards';
import Navigation from '../Navigation/Navigation';
import Modal from '../Modal/Modal';

/**
 * The main React **App** component.
 */
const App = () => {
  // Replace the below state with specific Modal e.g. isCreateClothingModalOpen, setIsCreateClothingModalOpen
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState('F');

// logic with actual data needed in the future 
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [userAvatar, setUserAvatar] = React.useState(false);
  const [userName, setUserName] = React.useState(false);
  
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
  }

  return (
    <div className="page">
      <div className="page__wrapper">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          {/* isLoggedIn will be determined by a future user context */}
          <Navigation isLoggedIn={isLoggedIn} username={userName} hasAvatar={userAvatar}/>
          App
          {/* Replace the Modal below with specific modals */}
          <Modal
            name="test"
            position="middle"
            width="wide"
            isOpen={isModalOpen}
            onClose={closeAllPopups}
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
