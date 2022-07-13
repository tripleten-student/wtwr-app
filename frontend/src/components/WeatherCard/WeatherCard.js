import './WeatherCard.css';
import { shortenDescription, categorizeWeatherTypeForImage } from '../../utils/weatherCards';

/**
 * WeatherCard component is individual weathercard that displays morning, afternoon, evening and overnight weather report
 * @author [Yuffie Hu](https://github.com/yuff1006)
 */

const WeatherCard = ({ displayedTime, timeOfTheDay }) => {
  const dayOrNight = displayedTime === 'Morning' || displayedTime === 'Afternoon' ? 'day' : 'night';

  /**
   * const {weatherCondition, description} = useContext()
   * this is just a placeholder for testing
   */
  const weatherCondition = 'Clear';
  const categorizedWeather = categorizeWeatherTypeForImage(weatherCondition);
  console.log(categorizedWeather);
  const backgroundImage =
    categorizedWeather === 'not found'
      ? ''
      : `weathercard_weather_${dayOrNight}-${categorizedWeather}`;

  const description = weatherCondition;
  // const shortenedDescription = shortenDescription(description);
  return (
    <div
      className={`weathercard weathercard_${dayOrNight} ${
        displayedTime.toLowerCase() === timeOfTheDay
          ? 'weathercard_elongated'
          : 'weathercard_overlay'
      } ${backgroundImage}`}
    >
      <div className="weathercard__info-container">
        <p className="weathercard__time">{displayedTime}</p>
        <p className="weathercard__temperature">73°</p>
        <p className="weathercard__description">
          {description}
          {/* {displayedTime.toLowerCase() === timeOfTheDay ? description : shortenedDescription} */}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
