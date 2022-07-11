import WeatherCard from './WeatherCard';
import './WeatherCards.css';

// WeatherCards is a container that holds all four WeatherCards. It is a CSS flexbox
// assuming celsius/fahrenheit, temperature, and weather parameters will be passed down from App.js using global context, I'm not including them as one of the parameters here

// description parameter comes from the API
const WeatherCards = ({ timeOfTheDay, description }) => {
  return (
    // modifier to adjust different CSS grid layout according to different times of the day
    <div className={`weathercards weathercards_${timeOfTheDay}`}>
      <WeatherCard displayedTime="Morning" timeOfTheDay={timeOfTheDay} />
      <WeatherCard displayedTime="Afternoon" timeOfTheDay={timeOfTheDay} />
      <WeatherCard displayedTime="Evening" timeOfTheDay={timeOfTheDay} />
      <WeatherCard displayedTime="Overnight" timeOfTheDay={timeOfTheDay} />
    </div>
  );
};

export default WeatherCards;
