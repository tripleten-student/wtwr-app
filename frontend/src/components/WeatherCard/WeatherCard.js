import { useContext } from 'react';
import './WeatherCard.css';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

/**
 * WeatherCard component is individual weathercard that displays morning, afternoon, evening and overnight weather report
 * @author [Yuffie Hu](https://github.com/yuff1006)
 */

const WeatherCard = ({ weatherData }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  if (!weatherData) return null;

  const { condition, temperature, dayOrNight, elongate, displayedTime, description } = weatherData;

  /** in case the weather API updates and adds more weather conditions that can't be accounted for in the future
   * display no image, just the background color
   */
  const backgroundImage =
    condition === 'not found' ? '' : `weathercard_weather_${dayOrNight}-${condition}`;

  return (
    <div
      className={`weathercard weathercard_${dayOrNight} ${
        elongate ? 'weathercard_elongated' : 'weathercard_overlay'
      } ${backgroundImage}`}
    >
      <div className="weathercard__info-container" aria-label={description}>
        <p className="weathercard__time">{displayedTime}</p>
        <p className="weathercard__temperature">{temperature[currentTemperatureUnit]}</p>
        {!elongate && (condition === 'rainy' || condition === 'snowy') && (
          <p className="weathercard__description">{description}</p>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
