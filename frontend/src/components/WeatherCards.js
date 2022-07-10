import WeatherCard from './WeatherCard';

// WeatherCards is a container that holds all four WeatherCards. It is a CSS grid
// assuming celsius/fahrenheit, temperature, and weather parameters will be passed down from App.js using global context, I'm not including them as one of the parameters here

// description parameter comes from the API
const WeatherCards = ({ timeOfTheDay, description }) => {
  return (
    // modifier to adjust different CSS grid layout according to different times of the day
    <div className={`weathercards weathercards_${timeOfTheDay}`}>
      <WeatherCard time="Morning" />
      <WeatherCard time="Afternoon" />
      <WeatherCard time="Evening" />
      <WeatherCard time="Overnight" />
    </div>
  );
};

export default WeatherCards;
