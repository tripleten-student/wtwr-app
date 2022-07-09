import React from 'react';
import WeatherCards from './WeatherCards';
import '../index.css';
import determineTimeOfTheDay from '../utils/time';

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
        <WeatherCards timeOfTheDay={timeOfTheDay} />
      </div>
    </div>
  );
};

export default App;
