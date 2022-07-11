import './WeatherCard.css';
import { shortenDescription } from '../../utils/weatherCards';

/**
 * WeatherCard component is individual weathercard that displays morning, afternoon, evening and overnight weather report
 * @author [Yuffie Hu](https://github.com/yuff1006)
 */

const WeatherCard = ({ displayedTime, timeOfTheDay }) => {
  const dayOrNight = displayedTime === 'Morning' || displayedTime === 'Afternoon' ? 'day' : 'night';
  /**
   * const {weather, description} = useContext()
   * this is just a placeholder for testing
   */
  const weather = 'sunny';
  const description = 'Chance of Rain: 70%';
  const shortenedDescription = shortenDescription(description);
  return (
    <div
      className={`weathercard weathercard_${dayOrNight} ${
        displayedTime.toLowerCase() === timeOfTheDay && 'weathercard_elongated'
      } weathercard_weather_${dayOrNight}-${weather}`}
    >
      <div className="weathercard__info-container">
        <p className="weathercard__time">{displayedTime}</p>
        <p className="weathercard__temperature">73°</p>
        <p className="weathercard__description">
          {displayedTime.toLowerCase() === timeOfTheDay ? description : shortenedDescription}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
