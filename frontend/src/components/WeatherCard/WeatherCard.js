import './WeatherCard.css';
import { generateDescription, categorizeWeatherTypeForImage } from '../../utils/weatherCards';

/**
 * WeatherCard component is individual weathercard that displays morning, afternoon, evening and overnight weather report
 * @author [Yuffie Hu](https://github.com/yuff1006)
 */

const WeatherCard = ({ displayedTime, timeOfTheDay }) => {
  const dayOrNight = displayedTime === 'Morning' || displayedTime === 'Afternoon' ? 'day' : 'night';

  /**
   * const {weatherCondition, chance_of_rain, chance_of_snow, temperature} = useContext()
   * this is just a placeholder for testing
   * change weatherCondition variable to any that's on the possible weather condition list (stored in utils/weatherCard.js) to test
   */
  const weatherCondition = 'Moderate or heavy rain shower';
  const chance_of_rain = '70%';
  const chance_of_snow = '40%';
  const categorizedWeather = categorizeWeatherTypeForImage(weatherCondition);
  const temperature = '73°';

  /** in case the weather API updates and adds more weather conditions that can't be accounted for in the future
   * display no image, just the background color
   */
  const backgroundImage =
    categorizedWeather === 'not found'
      ? ''
      : `weathercard_weather_${dayOrNight}-${categorizedWeather}`;
  /** this function generates description based on weather condition, if it's rainy or snowy, chance of rain/snow will be displayed, otherwise, weather condition alone is displayed. On shorter cards, chance of snow/rain is shortened */
  const description = generateDescription(
    categorizedWeather,
    chance_of_rain,
    chance_of_snow,
    displayedTime,
    timeOfTheDay
  );

  return (
    <div
      className={`weathercard weathercard_${dayOrNight} ${
        displayedTime.toLowerCase() === timeOfTheDay
          ? 'weathercard_elongated'
          : 'weathercard_overlay'
      } ${backgroundImage}`}
    >
      <div className="weathercard__info-container" aria-label="description">
        <p className="weathercard__time">{displayedTime}</p>
        <p className="weathercard__temperature">{temperature}</p>
        <p className="weathercard__description">{description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
