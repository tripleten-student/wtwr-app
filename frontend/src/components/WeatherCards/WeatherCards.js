import WeatherCard from '../WeatherCard/WeatherCard';
import './WeatherCards.css';

/**
 *  WeatherCards is a container that holds all four WeatherCards. It is a CSS flexbox
 * @author [Yuffie Hu](https://github.com/yuff1006)
 *
 *  assuming celsius/fahrenheit, temperature, and weather parameters will be passed down from App.js using global context, I'm not including them as one of the parameters here
 */

const WeatherCards = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    // modifier to adjust different CSS grid layout according to different times of the day
    <div className="weathercards">
      {weatherData.map((card) => (
        <WeatherCard displayedTime={card.timeName} weatherData={card} key={card.timeName} />
      ))}
    </div>
  );
};

export default WeatherCards;
