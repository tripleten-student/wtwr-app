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
  const [isLoginOpen, setIsLoginOpen] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserEmail, setCurrentUserEmail] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState('F');

  // not using state here, assuming the time only gets read every time user refreshes the page
  const currentHour = new Date().getHours();
  const timeOfTheDay = determineTimeOfTheDay(currentHour);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  // Handle mouse click or Esc key down event
  //Check if all the other modals are open using || operator
  const isAnyPopupOpen = isLoginOpen;
  React.useEffect(() => {
    const handleClickClose = (event) => {
      if (event.target.classList.contains('modal_opened')) {
        closeAllPopups();
      }
    };

    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    };

    if (isAnyPopupOpen) {
      document.addEventListener('click', handleClickClose);
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('click', handleClickClose);
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isAnyPopupOpen]);

  const closeAllPopups = () => {
    //Remove the code below & set modal's specific setState function to false
    setIsModalWithFormOpen(false);
  };
  // mock clothingCardData for testing ClothingCard component, please test the like button
  // by changing favorited from true to false
  const clothingCardData = {
    name: 'T-shirt',
    imageUrl: 'https://hollywoodchamber.net/wp-content/uploads/2020/06/tshirt-2.jpg',
    isLiked: true,
    type: 't-shirt',
  };
  function handleLikeClick(cardData) {
    console.log(cardData);
    // insert logic to interact with WTWR API
    setIsLoginOpen(false);
  }

  const handleLoginSubmit = () => {
    //call the auth.login(loginEmail, loginPassword)
    //if login successful
    setCurrentUserEmail(loginEmail);
    setLoginEmail('');
    setLoginPassword('');
    setIsLoggedIn(true);
    //else catch error
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    setCurrentUserEmail('');
  };
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
          {/* <ClothingCard
            name="T-shirt"
            // please test with empty string to see the default image show up on card with "add your photo" button
            cardData={clothingCardData}
            onCardLike={handleLikeClick}
          /> */}
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
};

export default App;
