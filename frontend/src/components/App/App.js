import React, { useCallback, useEffect, useState } from 'react';
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
import WeatherApiFailModal from '../WeatherApiFailModal/WeatherApiFailModal';
import EditClothingPreferencesModal from '../EditClothingPreferencesModal/EditClothingPreferencesModal';
import ShowClothingModal from '../ShowClothingModal/ShowClothingModal';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import {
  getGeolocation,
  getForecastWeather,
  filterDataFromWeatherAPI,
  getWeatherDataWithExpiry,
  setWeatherDataWithExpiry,
  generateWeatherDataWhenAPIFails,
} from '../../utils/weatherApi';
import { fifteenMinutesInMilliseconds } from '../../utils/constants';
import { login, register, checkToken } from '../../utils/auth';
import api from '../../utils/api';

/**
 * The main React **App** component.
 */
const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '' });
  const [weatherData, setWeatherData] = useState();
  const [newClothingItemUrl, setNewClothingItemUrl] = useState('');
  const [newClothingItemType, setNewClothingItemType] = useState('');
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedClothingCard, setSelectedClothingCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [likedCard, setLikeCard] = useState({});

  // States related to Modals
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
  const [isWeatherApiFailModalOpen, setIsWeatherApiFailModalOpen] = useState(false);

  // ********************************************************************************************* //
  //                   Fetch initial clothing items & user data on page load                       //
  // ********************************************************************************************* //

  useEffect(() => {
    if (!weatherData) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [weatherData]);
  // Get the current user info if the user is logged in
  useEffect(() => {
    isLoggedIn &&
      api
        .getCurrentUserData()
        .then((data) => {
          setCurrentUser({
            email: data.email,
            avatar: data.avatar,
            username: data.name,
            preferences: data.preferences,
            temperatureSelection: data.temperatureSelection,
          });
          setCurrentTemperatureUnit(data.temperatureSelection);
        })
        .catch((err) => console.log(err));
  }, [isLoggedIn]);

  const verifyToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  //Get all the clothing items for the user on page load
  useEffect(() => {
    isLoggedIn &&
      api
        .getAllClothingItems()
        .then(setClothingItems)
        .catch((err) => {
          console.log(
            'Uh-oh! Error occurred while fetching the existing clothing items from the server.'
          );
          console.log(err);
        });
  }, [isLoggedIn]);

  // ********************************************************************************************* //
  //           Fetch weather data from the weather API or local storage on page                    //
  // ********************************************************************************************* //
  const getWeatherDataUsingLocation = () => {
    if (userLocation.latitude && userLocation.longitude) {
      getForecastWeather(userLocation, process.env.REACT_APP_WEATHER_API_KEY)
        .then((data) => {
          setWeatherData(filterDataFromWeatherAPI(data));
          setWeatherDataWithExpiry('weatherData', data, fifteenMinutesInMilliseconds);
        })
        .catch(() => {
          setWeatherData(generateWeatherDataWhenAPIFails());
          setIsWeatherApiFailModalOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

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

  useEffect(() => {
    getWeatherDataWithExpiry('weatherData', getWeatherDataUsingLocation) &&
      setWeatherData(
        filterDataFromWeatherAPI(
          getWeatherDataWithExpiry('weatherData', getWeatherDataUsingLocation)
        )
      );
  }, [userLocation]);

  // ********************************************************************************************* //
  //                        Handle mouse click or Esc key down event                               //
  // ********************************************************************************************* //
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

  useEffect(() => {
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
    setIsWeatherApiFailModalOpen(false);
    setShowClothingModalOpen(false);
    setIsEditClothingModalOpen(false);
    setIsWeatherApiFailModalOpen(false);
  };

  // ********************************************************************************************* //
  //                         Handle all the events on the web page                                 //
  // ********************************************************************************************* //
  const handleLoginSubmit = (loginCredentials) => {
    login(loginCredentials).then(({ data, token }) => {
      if (data) {
        api.updateAuthUserToken(token);
        setCurrentUser({
          ...currentUser,
          email: data.email,
          avatar: data.avatar,
          username: data.name,
          preferences: data.preferences,
        });
        setIsLoggedIn(true);
        setIsLoginOpen(false);
      }
    });

    //else catch error
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

  const handleLogOut = () => {
    api.updateAuthUserToken('');
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('jwt');
  };

  const handleToggleSwitchChange = () => {
    if (isLoggedIn) {
      api
        .updateCurrentUserTemperatureSelection(currentTemperatureUnit === 'F' ? 'C' : 'F')
        .then((data) => {
          setCurrentTemperatureUnit(data.temperatureSelection);
        })
        .catch((err) => console.log(err));
    }
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  const handleCreateClothingItem = (garmentName, garmentType, weatherType, garmentUrl) => {
    const newClothingItem = {
      name: garmentName,
      type: garmentType,
      weather: weatherType,
      imageUrl: garmentUrl,
    };
    api
      .addNewClothingItem(newClothingItem)
      .then((newClothingItem) => {
        closeAllPopups();
        setClothingItems([newClothingItem, ...clothingItems]);
        setNewClothingItemType(newClothingItem.type);
        setNewClothingItemUrl(newClothingItem.imageUrl);
        setIsCreateClothingConfirmationModalOpen(true);
      })
      .catch((err) => {
        console.log('Uh-oh! Error occurred while adding a new clothing item to the server.');
        console.log(err);
      });
  };

  const handleEditClothing = (updatedClothingItemData) => {
    api
      .updateClothingItem(updatedClothingItemData)
      .then((updatedClothingItem) => {
        const tempClothingItems = clothingItems.filter(
          (item) => item._id !== updatedClothingItem._id
        );
        setClothingItems([...tempClothingItems, updatedClothingItem]);
        setSelectedClothingCard(updatedClothingItem);
      })
      .catch((err) => {
        console.log('Uh-oh! Error occurred while adding a new clothing item to the server.');
        console.log(err);
      });
  };

  const handleChangePasswordSubmit = ({ oldPassword, newPassword }) => {
    api
      .updateCurrentUserPassword({ oldPassword, newPassword })
      .then(() => console.log('Password changed successfully'))
      .catch((err) => {
        console.log('Uh-oh! Error occurred while changing password to the server.');
        console.log(err);
      });
  };

  const handleUpdateProfileData = (userData) => {
    api
      .updateCurrentUserData(userData)
      .then((response) => {
        setCurrentUser({
          ...currentUser,
          username: response.name,
          avatar: response.avatar,
        });
      })
      .catch((error) => console.error(`${error}: Could not update`));
  };

  const handleEditClothingPreferencesSubmit = (clothingPreferences) => {
    api
      .updateCurrentUserPreferences(clothingPreferences)
      .then(({ preferences }) => {
        setCurrentUser({
          ...currentUser,
          preferences,
        });
      })
      .catch((err) => {
        console.log(
          'Uh-oh! Error occurred while updating current user clothing preference to the server.'
        );
        console.log(err);
      });
  };

  const handleDeleteProfileSubmit = () => {
    api
      .deleteCurrentUser()
      .then(() => {
        console.log('User is deleted');
        closeAllPopups();
        handleLogOut();
      })
      .catch((err) => {
        console.log('Uh-oh! Error occurred while deleting the profile from the server.');
        console.log(err);
      });
  };

  const handleClothingItemCardClick = (cardData) => {
    if (isLoggedIn) {
      setSelectedClothingCard(cardData);
      setShowClothingModalOpen(true);
    }

    if (!cardData.imageUrl) {
      setSelectedClothingCard(null);
      setShowClothingModalOpen(false);
    }
  };

  const handleShowClothingModalEditClick = () => {
    closeAllPopups();
    setIsEditClothingModalOpen(true);
  };

  const handleClothingItemLikeClick = (cardData) => {
    api
      .toggleClothingItemLikeStatus(cardData._id)
      .then((likedCard) => {
        setClothingItems((state) =>
          state.map((currentItem) => (currentItem._id === cardData._id ? likedCard : currentItem))
        );
        setLikeCard(likedCard);
      })
      .catch((err) => console.log(err));
  };

  if (!weatherData) return null;

  return (
    <div className="page">
      <div className="page__wrapper">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header weatherData={weatherData}>
              <Navigation
                isLoggedIn={isLoggedIn}
                handleAddClick={() => setIsCreateClothingModalOpen(true)}
                handleRegisterClick={() => setIsRegisterOpen(true)}
                handleLoginClick={() => setIsLoginOpen(true)}
              />
            </Header>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    isLoggedIn={isLoggedIn}
                    onCardClick={handleClothingItemCardClick}
                    onCardLike={handleClothingItemLikeClick}
                    clothingItems={clothingItems}
                    likedCard={likedCard}
                    handleLoginOpen={() => setIsLoginOpen(true)}
                    onAddNewClick={() => setIsCreateClothingModalOpen(true)}
                  />
                }
              />
              <Route
                exact
                path="/profile"
                element={
                  <ProtectedRoute
                    handleLoginClick={() => setIsLoginOpen(true)}
                    isLoggedIn={isLoggedIn}
                  >
                    <Profile
                      clothingItems={clothingItems}
                      onCardLike={handleClothingItemLikeClick}
                      onCardClick={handleClothingItemCardClick}
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
              />
            </Routes>
            <Login
              isOpen={isLoginOpen}
              onClose={closeAllPopups}
              onSubmit={handleLoginSubmit}
              openRegisterModal={() => {
                setIsRegisterOpen(true);
                setIsLoginOpen(false);
              }}
            />
            <Register
              isOpen={isRegisterOpen}
              onClose={closeAllPopups}
              onSubmit={handleRegisterSubmit}
              openLoginModal={() => {
                setIsLoginOpen(true);
                setIsRegisterOpen(false);
              }}
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
              onUpdatePassword={handleChangePasswordSubmit}
            />
            <EditClothingPreferencesModal
              isOpen={isEditClothingPreferencesModalOpen}
              onClose={closeAllPopups}
              onSubmit={handleEditClothingPreferencesSubmit}
            />
            <DeleteProfileModal
              isOpen={isDeleteProfileOpen}
              onClose={closeAllPopups}
              onDeleteProfile={handleDeleteProfileSubmit}
            />
            <CreateClothingModal
              isOpen={isCreateClothingModalOpen}
              onClose={closeAllPopups}
              onSubmitAddGarment={handleCreateClothingItem}
            />
            <CreateClothingConfirmationModal
              isOpen={isCreateClothingConfirmationModalOpen}
              onClose={closeAllPopups}
              createdClothingItemUrl={newClothingItemUrl}
              createdClothingItemType={newClothingItemType}
            />
            <ShowClothingModal
              card={selectedClothingCard || {}}
              isOpen={isShowClothingModalOpen}
              onCardLike={handleClothingItemLikeClick}
              onClose={closeAllPopups}
              handleClick={handleShowClothingModalEditClick}
            />
            <EditClothingModal
              isOpen={isEditClothingModalOpen}
              onClose={closeAllPopups}
              onSubmitEditGarment={handleEditClothing}
              currentGarment={selectedClothingCard || {}}
            />
            <WeatherApiFailModal isOpen={isWeatherApiFailModalOpen} onClose={closeAllPopups} />
            <LoadingSpinner isLoading={isLoading} />
            <Footer weatherData={weatherData} />
            <MobileNavigation
              isLoggedIn={isLoggedIn}
              openLoginModal={() => setIsLoginOpen(true)}
              openNewGarmentModal={() => setIsCreateClothingModalOpen(true)}
            />
          </CurrentTemperatureUnitContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
};

export default App;
