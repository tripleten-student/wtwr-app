const WeatherCard = ({ time }) => {
  return (
    <div
      className={`weathercard ${
        time === 'Morning' || time === 'Afternoon' ? 'weathercard_day' : 'weathercard_night'
      }`}
    >
      <div className="weathercard__info-container">
        <p className="weathercard__time">{time}</p>
        <p className="weathercard__temperature">73°</p>
        <p className="weathercard__description">Chance of rain: 70%</p>
      </div>
    </div>
  );
};

export default WeatherCard;
