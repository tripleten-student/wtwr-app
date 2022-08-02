/** This module takes care of the geolocation API and weather API logic, as well as logic for data processing
 * It reads the user's location (longitutde and latitude) and stores the information in local storage
 * Then sends longitutde and latitude to the weahter 'forecast' API, gets back weather forcast information on an hourly basis
 *
 * @author [Yuffie Hu](https://github.com/yuff1006)
 */

const categorizeWeatherTypeForImage = (description) => {
  description = description.toLowerCase();
  if (
    description.includes('rain') ||
    (description.includes('drizzle') && !description.includes('freezing'))
  ) {
    return 'rainy';
  } else if (description.includes('sun') || description.includes('clear')) {
    return 'sunny';
  } else if (description.includes('fog') || description.includes('mist')) {
    return 'foggy';
  } else if (
    description.includes('pellet') ||
    description.includes('sleet') ||
    description.includes('freezing drizzle')
  ) {
    return 'sleet';
  } else if (description.includes('thunder')) {
    return 'stormy';
  } else if (description.includes('snow') || description.includes('blizzard')) {
    return 'snowy';
  } else if (description.includes('cloud') || description.includes('overcast')) {
    return 'cloudy';
  } else {
    return 'not found';
  }
};

const determineTimeOfTheDay = (currentHour) => {
  if (currentHour >= 5 && currentHour < 12) {
    return 'morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'afternoon';
  } else if (currentHour >= 17 && currentHour < 20) {
    return 'evening';
  } else {
    return 'overnight';
  }
};

/** this function generates description based on weather condition, if it's rainy or snowy, chance of rain/snow will be displayed, otherwise, weather condition alone is displayed. On shorter cards, chance of snow/rain is shortened */
const generateDescription = (categorizedWeather, weatherData) => {
  if (categorizedWeather === 'snowy') {
    return `${weatherData.chance_of_snow}%`;
  } else if (categorizedWeather === 'rainy') {
    return `${weatherData.chance_of_rain}%`;
  } else {
    return categorizedWeather.charAt(0).toUpperCase() + categorizedWeather.slice(1);
  }
};
const currentHour = new Date().getHours();
const timeOfTheDay = determineTimeOfTheDay(currentHour);

const filterDataFromWeatherAPI = (data) => {
  if (!data) {
    return null;
  }
  const forecastArr = [];
  const timeBreakPoints = [7, 13, 18, 22];
  const currentDataPath = data.current;
  timeBreakPoints.forEach((point) => {
    const elongateOrNot = determineTimeOfTheDay(point) === timeOfTheDay ? true : false;
    const dayOrNight = point > 13 ? 'night' : 'day';
    const forecastDataPath = data.forecast.forecastday[0].hour[point - 1];
    const categorizedForecastWeatherCondition = categorizeWeatherTypeForImage(
      forecastDataPath.condition.text
    );
    const categorizedCurrentWeatherCondition = categorizeWeatherTypeForImage(
      currentDataPath.condition.text
    );
    forecastArr.push({
      // lowercase afternoon, morning ... for CSS
      timeName: determineTimeOfTheDay(point),
      condition: elongateOrNot
        ? categorizeWeatherTypeForImage(currentDataPath.condition.text)
        : categorizeWeatherTypeForImage(forecastDataPath.condition.text),
      temperature: elongateOrNot
        ? {
            F: `${Math.trunc(currentDataPath.temp_f)}°`,
            C: `${Math.trunc(currentDataPath.temp_c)}°`,
          }
        : {
            F: `${Math.trunc(forecastDataPath.temp_f)}°`,
            C: `${Math.trunc(forecastDataPath.temp_c)}°`,
          },
      dayOrNight: dayOrNight,
      elongate: elongateOrNot,
      // first letter uppercase for displaying on the card
      displayedTime:
        determineTimeOfTheDay(point).charAt(0).toUpperCase() +
        determineTimeOfTheDay(point).slice(1),
      description: elongateOrNot
        ? generateDescription(categorizedCurrentWeatherCondition, currentDataPath)
        : generateDescription(categorizedForecastWeatherCondition, forecastDataPath),
      city: data.location.name,
    });
  });
  return forecastArr;
};

const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getForecastWeather = (location, APIkey) => {
  /** For testing, please console.log("api called") and see that it only gets called upon initial render
   * If you don't see it, go into DevTools => Application => Storange => LocalStorage
   * To see what is stored in local storage
   * Clear it so nothing is in there and refresh the page, and watch that "api call" gets logged to the console, refresh again, see nothing gets logged to the console, meaning the api didn't get called upon refresh within 15 minutes
   */
  /** location passed in will be an object with latitude and longitude keys
   * the API takes the two combined(latitude first) seperated by a comma
   */
  const parsedLocation = `${location.latitude},${location.longitude}`;
  return fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${parsedLocation}&days=1`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

const setWeatherDataWithExpiry = (key, weatherAPIData, ttl) => {
  const currentTime = new Date().getTime();
  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: weatherAPIData,
    expiry: currentTime + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getWeatherDataWithExpiry = (key, getWeatherDataUsingLocation) => {
  const weatherDataString = localStorage.getItem(key);
  if (weatherDataString) {
    const weatherData = JSON.parse(weatherDataString);
    const currentTime = new Date().getTime();
    // compare the expiry time of the item with the current time
    if (currentTime > weatherData.expiry) {
      // If the item is expired, delete the item from storage
      localStorage.removeItem(key);
      //cal getForecastWeather
      getWeatherDataUsingLocation();
    }
    // returns the weatherData from the last call
    return weatherData.value;
  } else {
    getWeatherDataUsingLocation();
  }
};

export {
  filterDataFromWeatherAPI,
  getForecastWeather,
  getGeolocation,
  getWeatherDataWithExpiry,
  setWeatherDataWithExpiry,
};
