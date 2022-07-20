import './WeatherCard.css';
import { categorizeWeatherTypeForImage, generateDescription } from '../../utils/weatherApi';

/**
 * WeatherCard component is individual weathercard that displays morning, afternoon, evening and overnight weather report
 * @author [Yuffie Hu](https://github.com/yuff1006)
 */

const WeatherCard = ({ displayedTime, weatherData }) => {
  if (!weatherData) return null;

  /** in case the weather API updates and adds more weather conditions that can't be accounted for in the future
   * display no image, just the background color
   */
  const backgroundImage =
    weatherData.condition === 'not found'
      ? ''
      : `weathercard_weather_${weatherData.dayOrNight}-${weatherData.condition}`;
  /** this function generates description based on weather condition, if it's rainy or snowy, chance of rain/snow will be displayed, otherwise, weather condition alone is displayed. On shorter cards, chance of snow/rain is shortened */
  const description = generateDescription(weatherData, displayedTime);

  return (
    <div
      className={`weathercard weathercard_${weatherData.dayOrNight} ${
        weatherData.elongate && 'weathercard_elongated'
      } ${backgroundImage}`}
    >
      <div className="weathercard__info-container" aria-label="description">
        <p className="weathercard__time">
          {displayedTime.charAt(0).toUpperCase() + displayedTime.slice(1)}
        </p>
        <p className="weathercard__temperature">{weatherData.temperature}</p>
        <p className="weathercard__description">{description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
