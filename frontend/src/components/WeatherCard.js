import './WeatherCard.css';

// WeatherCard component is individual weathercard that displays morning, afternoon, evening and overnight weather report
const WeatherCard = ({ displayedTime, timeOfTheDay }) => {
  const dayOrNight = displayedTime === 'Morning' || displayedTime === 'Afternoon' ? 'day' : 'night';
  //const weather = useContext()
  //this is just a placeholder for testing
  const weather = 'storm';
  return (
    <div
      className={`weathercard weathercard_${dayOrNight} ${
        displayedTime.toLowerCase() === timeOfTheDay && 'weathercard_elongated'
      } weathercard_weather_${dayOrNight}-${weather}`}
    >
      <div className="weathercard__info-container">
        <p className="weathercard__time">{displayedTime}</p>
        <p className="weathercard__temperature">73°</p>
        <p className="weathercard__description">Chance of rain: 70%</p>
      </div>
    </div>
  );
};

export default WeatherCard;
