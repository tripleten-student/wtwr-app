import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Login from '../Login/Login';
import Register from '../Register/Register';
import CompleteRegistrationModal from '../CompleteRegistrationModal/CompleteRegistrationModal';
import Profile from '../Profile/Profile';
import EditPasswordModal from '../EditPasswordModal/EditPasswordModal';
import EditProfileDataModal from '../EditProfileDataModal/EditProfileDataModal';
import DeleteProfileModal from '../DeleteProfileModal/DeleteProfileModal';
import CreateClothingModal from '../CreateClothingModal/CreateClothingModal';
import CreateClothingConfirmationModal from '../CreateClothingConfirmationModal/CreateClothingConfirmationModal';
import EditClothingModal from '../EditClothingModal/EditClothingModal';
import EditClothingPreferences from '../EditClothingPreferences/EditClothingPreferences';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
  getGeolocation,
  getForecastWeather,
  filterDataFromWeatherAPI,
  getWeatherDataWithExpiry,
  setWeatherDataWithExpiry,
} from '../../utils/weatherApi';
import { fifteenMinutesInMilleseconds } from '../../utils/constants';
import { weatherTypes } from '../../utils/formConstants';
import { login, register, checkToken } from '../../utils/auth';
import ShowClothingModal from '../ShowClothingModal/ShowClothingModal';

/**
 * The main React **App** component.
 */
const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentGarment, setCurrentGarment] = useState({
    garmentName: 'Shirt',
    garmentType: 'shirt',
    weatherType: 'extreme',
    garmentUrl:
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNoaXJ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  // logic with actual data needed in the future
  // set "true" to simulate `isLoggedIn = true` look of the Navigation bar
  // userLocation is a state within a useEffect as the state should only be changed once after loading
  const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '' });
  const [weatherData, setweatherData] = useState();
  // set useClothingPreferences from API
  const [userClothingPreferences, setUserClothingPreferences] = useState([
    't-shirt',
    'jeans',
    'dress',
    'boots',
  ]);
  // set the url of newly created garment from handleCreateClothing() to pass on to the CreateClothingConfirmationModal
  const [newClothingItemUrl, setNewClothingItemUrl] = useState('');
  const [newClothingItemType, setNewClothingItemType] = useState('');

  const [selectedClothingCard, setSelectedClothingCard] = useState(null);

  //// Modals ////
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCompleteRegistrationOpen, setIsCompleteRegistrationOpen] = useState(false);
  const [isEditProfileDataModalOpen, setIsEditProfileDataModalOpen] = useState(false);
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);
  const [isDeleteProfileOpen, setIsDeleteProfileOpen] = useState(false);
  const [isCreateClothingModalOpen, setIsCreateClothingModalOpen] = useState(false);
  const [isEditClothingModalOpen, setIsEditClothingModalOpen] = useState(false);
  const [isCreateClothingConfirmationModalOpen, setIsCreateClothingConfirmationModalOpen] =
    useState(false);
  const [isEditClothingPreferencesModalOpen, setIsEditClothingPreferencesModalOpen] =
    useState(false);
  const [isShowClothingModalOpen, setShowClothingModalOpen] = useState(false);

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
  /** this gets called every time the user changes location: when user initially disallowed location sharing. and then later allowed it, upon page refresh, the location and the weather updates right away, evne within 15 minutes */
  useEffect(() => {
    getWeatherDataUsingLocation();
  }, [userLocation]);
  /** the weather API gets called or pulled from local storage every time the location changes or gets read */
  useEffect(() => {
    /** does the local storage already have weather data? if so, setState with this data and pass it on to components, if not (written in the function itself that's imported from ../utils/weatherApi.js), make the api call detailed above */
    getWeatherDataWithExpiry('weatherData', getWeatherDataUsingLocation) &&
      setweatherData(
        filterDataFromWeatherAPI(
          getWeatherDataWithExpiry('weatherData', getWeatherDataUsingLocation)
        )
      );
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({
              ...currentUser,
              username: res.name,
              email: res.email,
              avatar: res.avatar,
            });
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
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
    isDeleteProfileOpen ||
    isCreateClothingModalOpen ||
    isEditClothingModalOpen ||
    isEditClothingPreferencesModalOpen ||
    isCreateClothingConfirmationModalOpen ||
    isShowClothingModalOpen;

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
    setIsDeleteProfileOpen(false);
    setIsCreateClothingModalOpen(false);
    setIsCreateClothingConfirmationModalOpen(false);
    setIsEditClothingModalOpen(false);
    setIsEditClothingPreferencesModalOpen(false);
    setShowClothingModalOpen(false);
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

  const handleLoginSubmit = (loginCredentials) => {
    login(loginCredentials).then(({ data }) => {
      if (data) {
        console.log(data);
        setCurrentUser({
          ...currentUser,
          email: data.email,
          avatar: data.avatar,
          username: data.name,
        });
        setLoginEmail('');
        setLoginPassword('');
        setIsLoggedIn(true);
        setIsLoginOpen(false);
      }
    });

    //else catch error
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('jwt');
  };

  const handleCreateClothing = (garmentName, garmentType, weatherType, garmentUrl) => {
    console.log('Garment successfully added to your profile');
    console.log({ garmentName, garmentType, weatherType, garmentUrl });
    closeAllPopups();
    setIsCreateClothingConfirmationModalOpen(true);
    setNewClothingItemUrl(garmentUrl);
    setNewClothingItemType(garmentType);
  };

  const handleEditClothing = (garmentName, garmentType, weatherType, garmentUrl) => {
    console.log('Garment successfully updated');
    console.log({ garmentName, garmentType, weatherType, garmentUrl });
    setCurrentGarment({ garmentName, garmentType, weatherType, garmentUrl });
  };
  const handlelChangePasswordSubmit = (password) => {
    console.log('new password set');
  };

  const handleUpdateProfileData = (userData) => {
    console.log('api patch will be implemented');
    console.log(userData);
  };

  const handleRegisterSubmit = (registerCredentials) => {
    closeAllPopups();
    register(registerCredentials)
      .then((data) => {
        setIsCompleteRegistrationOpen(true);
        handleLoginSubmit(registerCredentials);
      })
      .catch((err) => {
        // clarify behaviour for errors: invalid username/password
        console.log(err);
      });
  };

  const handleDeleteProfileSubmit = () => {
    console.log('profile deleted');
  };

  const handleEditClothingPreferencesSubmit = (clothingPreferences) => {
    //An API call to update the clothing preferences
    console.log("User's clothing preferences has been changed");
    console.log(clothingPreferences);
  };

  const handleClothingClick = (cardData) => {
    setSelectedClothingCard(cardData);
    setShowClothingModalOpen(true);
  }

  return (
    <div className="page">
      <div className="page__wrapper">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            {/* isLoggedIn will be determined by a future user context */}
            {/* I left the userName state in for the purpose of seeing the different navigation css */}
            {/** rewrite `{userName}` to `{currentUser}` when ready */}
            {/** place login modal open state in Navigation*/}
            <Header weatherData={weatherData}>
              <Navigation
                isLoggedIn={isLoggedIn}
                username={currentUser.username}
                hasAvatar={currentUser.avatar}
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
                    <Profile
                      cardData={clothingCardData}
                      onCardLike={handleLikeClick}
                      onCardClick={handleClothingClick}
                      onLogOutClick={handleLogOut}
                      onAddNewClick={() => setIsCreateClothingModalOpen(true)}
                      onChangePasswordClick={() => setIsEditPasswordModalOpen(true)}
                      onChangeProfileClick={() => setIsEditProfileDataModalOpen(true)}
                      onChangeClothesPreferencesClick={() =>
                        setIsEditClothingPreferencesModalOpen(true)
                      }
                      onDeleteProfileClick={() => setIsDeleteProfileOpen(true)}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
            {/* Replace the ModalWithForm below with specific modals */}
            <Login
              isOpen={isLoginOpen}
              onClose={closeAllPopups}
              onSubmit={handleLoginSubmit}
              setLoginEmail={setLoginEmail}
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
            <CreateClothingConfirmationModal
              isOpen={isCreateClothingConfirmationModalOpen}
              onClose={closeAllPopups}
              createdClothingItemUrl={newClothingItemUrl}
              createdClothingItemType={newClothingItemType}
            />
            <ShowClothingModal
              // tempDegree={} // function or something that says what temp in degree the clothes are for
              card={selectedClothingCard || clothingCardData}
              tempUnit={currentTemperatureUnit || 'F'}
              isOpen={isShowClothingModalOpen}
              onClose={closeAllPopups}
              handleClick={() => setIsEditClothingModalOpen(true)}
            />
            <EditClothingModal
              isOpen={isEditClothingModalOpen}
              onClose={closeAllPopups}
              onSubmitEditGarment={handleEditClothing}
              currentGarment={currentGarment}
            />
            <EditClothingPreferences
              isOpen={isEditClothingPreferencesModalOpen}
              onClose={closeAllPopups}
              onSubmit={handleEditClothingPreferencesSubmit}
              userClothingPreferences={userClothingPreferences}
            />
            <Footer />
          </CurrentTemperatureUnitContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
};

export default App;
