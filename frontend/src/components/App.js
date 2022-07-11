import React from 'react';
import WeatherCards from './WeatherCards/WeatherCards';
import { determineTimeOfTheDay } from '../utils/weatherCards';

/**
 * The main React **App** component.
 */
const App = () => {
  // not using state here, assuming the time only gets read every time user refreshes the page
  const currentHour = new Date().getHours();
  const timeOfTheDay = determineTimeOfTheDay(currentHour);

  return (
    <div className="page">
      <div className="page__wrapper">
        App
        <WeatherCards timeOfTheDay={timeOfTheDay} description="Data from Weather API" />
      </div>
    </div>
  );
};

export default App;
