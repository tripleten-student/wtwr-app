import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import CurrentGarmentContext from '../../contexts/CurrentGarmentContext';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Login from '../Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import EditClothingModal from '../EditClothingModal/EditClothingModal';
import CreateClothingModal from '../CreateClothingModal/CreateClothingModal';
import EditPasswordModal from '../EditPasswordModal/EditPasswordModal';
import EditProfileDataModal from '../EditProfileDataModal/EditProfileDataModal';
import DeleteProfileModal from '../DeleteProfileModal/DeleteProfileModal';
import CompleteRegistrationModal from '../CompleteRegistrationModal/CompleteRegistrationModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { register } from '../../utils/auth';
import {
  getGeolocation,
  getForecastWeather,
  filterDataFromWeatherAPI,
  getWeatherDataWithExpiry,
  setWeatherDataWithExpiry,
} from '../../utils/weatherApi';
import { fifteenMinutesInMilleseconds } from '../../utils/constants';

/**
 * The main React **App** component.
 */
const App = () => {
  const [currentUser, setCurrentUser] = React.useState({
    username: 'Practicum',
    avatar:
      'https://images.unsplash.com/photo-1619650277752-9b853abf815b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=60',
    email: 'practicum@email.com',
  });
const [currentGarment, setCurrentGarment] = useState({
      garmentName: 'Shirt',
      garmentType: 'Shirt',
      weatherType:'Extreme (97F°)',
      garmentUrl: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNoaXJ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
})
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  // logic with actual data needed in the future
  const [userAvatar, setUserAvatar] = useState(true);
  // set "true" to simulate `isLoggedIn = true` look of the Navigation bar
  const [userName, setUserName] = useState(false);
  // userLocation is a state within a useEffect as the state should only be changed once after loading
  const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '' });
  const [weatherData, setweatherData] = useState();

  //// Modals ////
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCompleteRegistrationOpen, setIsCompleteRegistrationOpen] = useState(false);
  const [isEditProfileDataModalOpen, setIsEditProfileDataModalOpen] = useState(false);
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);
  const [isCreateClothingModalOpen, setIsCreateClothingModalOpen] = React.useState(false);
  const [isDeleteProfileOpen, setIsDeleteProfileOpen] = useState(false);
  const [isEditClothingModalOpen, setIsEditClothingModalOpen] = useState(true);

  /** Location gets read only once every time upon page refresh, this is not dependent upon weather api call */
  useEffect(() => {
    getGeolocation()
      .then(({ coords }) => {
        setUserLocation({
          ...userLocation,
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        localStorage.setItem(
          'userLocation',
          JSON.stringify({ latitude: coords.latitude, longitude: coords.longitude })
        );
      })
      .catch(() => {
        const savedLocation = localStorage.getItem('userLocation');
        if (savedLocation !== null) {
          const parsedLocation = JSON.parse(savedLocation);
          if (parsedLocation.latitude && parsedLocation.longitude) {
            setUserLocation({
              ...userLocation,
              latitude: parsedLocation.latitude,
              longitude: parsedLocation.longitude,
            });
          }
        } else {
          setUserLocation({ ...userLocation, latitude: '40.730610', longitude: '-73.935242' });
        }
      });
  }, []);

  /** the weather API gets called or pulled from local storage every time the location changes or gets read */
  useEffect(() => {
    const getWeatherDataUsingLocation = () => {
      if (userLocation.latitude && userLocation.longitude) {
        getForecastWeather(userLocation, process.env.REACT_APP_WEATHER_API_KEY)
          .then((data) => {
            setweatherData(filterDataFromWeatherAPI(data));
            setWeatherDataWithExpiry('weatherData', data, fifteenMinutesInMilleseconds);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    /** does the local storage already have weather data? if so, setState with this data and pass it on to components, if not (written in the function itself that's imported from ../utils/weatherApi.js), make the api call detailed above */
    getWeatherDataWithExpiry('weatherData', getWeatherDataUsingLocation) &&
      setweatherData(
        filterDataFromWeatherAPI(
          getWeatherDataWithExpiry('weatherData', getWeatherDataUsingLocation)
        )
      );
  }, [userLocation]);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  // Handle mouse click or Esc key down event
  //Check if all the other modals are open using || operator
  const isAnyPopupOpen =
    isLoginOpen ||
    isRegisterOpen ||
    isCompleteRegistrationOpen ||
    isEditProfileDataModalOpen ||
    isEditPasswordModalOpen ||
    isCreateClothingModalOpen ||
    isDeleteProfileOpen ||
    isEditClothingModalOpen;

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
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsCompleteRegistrationOpen(false);
    setIsEditProfileDataModalOpen(false);
    setIsEditPasswordModalOpen(false);
    setIsCreateClothingModalOpen(false);
    setIsDeleteProfileOpen(false);
    setIsEditClothingModalOpen(false);
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
    // insert logic to interact with WTWR API
    setIsLoginOpen(false);
  }

  const handleLoginSubmit = () => {
    //call the auth.login(loginEmail, loginPassword)
    //if login successful
    setCurrentUserEmail(loginEmail);
    setIsLoginOpen(false);
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
  const handleCreateClothing = (garmentName, garmentType, weatherType, garmentUrl) => {
    console.log('Garment successfully added to your profile');
    console.log({ garmentName, garmentType, weatherType, garmentUrl });
  };
const handleEditClothing = (garmentName, garmentType, weatherType, garmentUrl) =>{
  console.log('Garment successfully updated');
    console.log({ garmentName, garmentType, weatherType, garmentUrl });
    setCurrentGarment(garmentName, garmentType, weatherType, garmentUrl)
}
  const handlelChangePasswordSubmit = (password) => {
    console.log('new password set');
  };

  const handleUpdateProfileData = (userData) => {
    console.log('api patch will be implemented');
    console.log(userData);
  };

  const handleRegisterSubmit = (credentials) => {
    // credentials to be used in API call to backend
    register(credentials)
      .then((data) => {
        console.log(data);
        closeAllPopups();
        setIsCompleteRegistrationOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteProfileSubmit = () => {
    console.log('profile deleted');
  };

  return (
    <div className="page">
      <div className="page__wrapper">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentGarmentContext.Provider value ={currentGarment}>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            {/* isLoggedIn will be determined by a future user context */}
            {/* I left the userName state in for the purpose of seeing the different navigation css */}
            {/** rewrite `{userName}` to `{currentUser}` when ready */}
            {/** place login modal open state in Navigation*/}
            <Header>
              <Navigation
                isLoggedIn={isLoggedIn}
                username={userName}
                hasAvatar={userAvatar}
                handleRegisterClick={() => setIsRegisterOpen(true)}
                handleLoginClick={() => setIsLoginOpen(true)}
              />
            </Header>
            <Routes>
              <Route
                exact
                path="/"
                element={<Main weatherData={weatherData} isLoggedIn={isLoggedIn} />}
              ></Route>
              <Route
                exact
                path="/profile"
                element={
                  <ProtectedRoute
                    handleLoginClick={() => setIsLoginOpen(true)}
                    isLoggedIn={isLoggedIn}
                  >
                    <Profile cardData={clothingCardData} onCardLike={handleLikeClick} />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
            {/* Replace the ModalWithForm below with specific modals */}
            <Login
              isOpen={isLoginOpen}
              onClose={closeAllPopups}
              onSubmit={handleLoginSubmit}
              loginEmail={loginEmail}
              setLoginEmail={setLoginEmail}
              loginPassword={loginPassword}
              setLoginPassword={setLoginPassword}
            />
            <Register
              isOpen={isRegisterOpen}
              onClose={closeAllPopups}
              onSubmit={handleRegisterSubmit}
            />
            <CompleteRegistrationModal
              isOpen={isCompleteRegistrationOpen}
              onClose={closeAllPopups}
            />
            <EditProfileDataModal
              isOpen={isEditProfileDataModalOpen}
              onClose={closeAllPopups}
              onUpdateUserProfile={handleUpdateProfileData}
            />
            <EditPasswordModal
              isOpen={isEditPasswordModalOpen}
              onClose={closeAllPopups}
              onUpdatePassword={handlelChangePasswordSubmit}
            />
            <DeleteProfileModal
              isOpen={isDeleteProfileOpen}
              onClose={closeAllPopups}
              onDeleteProfile={handleDeleteProfileSubmit}
            />
            <CreateClothingModal
              isOpen={isCreateClothingModalOpen}
              onClose={closeAllPopups}
              onSubmitAddGarment={handleCreateClothing}
            />
            <EditClothingModal
              isOpen={isEditClothingModalOpen}
              onClose={closeAllPopups}
              onSubmitEditGarment={handleEditClothing}
            />
            <Footer />
          </CurrentTemperatureUnitContext.Provider>
          </CurrentGarmentContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
};

export default App;
