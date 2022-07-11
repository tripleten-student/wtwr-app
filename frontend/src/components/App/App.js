import React from 'react';
import './App.css';
import WeatherCards from '../WeatherCards/WeatherCards';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import { determineTimeOfTheDay } from '../../utils/weatherCards';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

/**
 * The main React **App** component.
 */
const App = () => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState('F');

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  // not using state here, assuming the time only gets read every time user refreshes the page
  const currentHour = new Date().getHours();
  const timeOfTheDay = determineTimeOfTheDay(currentHour);

  return (
    <div className="page">
      <div className="page__wrapper">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Navigation/>
          App
          <WeatherCards timeOfTheDay={timeOfTheDay} description="Data from Weather API" />
          <Main />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
};

export default App;
