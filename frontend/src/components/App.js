import React from 'react';
import './App.css';
import WeatherCards from '../WeatherCards/WeatherCards';
import { determineTimeOfTheDay } from '../../utils/weatherCards';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../components/Header/Header';

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
        <Header />
        <WeatherCards timeOfTheDay={timeOfTheDay} description="Data from Weather API" />
        <Main/>
        <Footer />
      </div>
    </div>
  );
};

export default App;