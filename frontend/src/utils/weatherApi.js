/** This module takes care of the geolocation API and weather API logic, as well as logic for data processing
 * It reads the user's location (longitutde and latitude) and stores the information in local storage
 * Then sends longitutde and latitude to the weahter 'forecast' API, gets back weather forcast information on an hourly basis
 *
 * @author [Yuffie Hu](https://github.com/yuff1006)
 */

const uniqueDayAndNightConditions = [
  'Sunny',
  'Clear',
  'Partly cloudy',
  'Cloudy',
  'Overcast',
  'Mist',
  'Patchy rain possible',
  'Patchy snow possible',
  'Patchy sleet possible',
  'Patchy freezing drizzle possible',
  'Thundery outbreaks possible',
  'Blowing snow',
  'Blizzard',
  'Fog',
  'Freezing fog',
  'Patchy light drizzle',
  'Light drizzle',
  'Freezing drizzle',
  'Heavy freezing drizzle',
  'Patchy light rain',
  'Light rain',
  'Moderate rain at times',
  'Moderate rain',
  'Heavy rain at times',
  'Heavy rain',
  'Light freezing rain',
  'Moderate or heavy freezing rain',
  'Light sleet',
  'Moderate or heavy sleet',
  'Patchy light snow',
  'Light snow',
  'Patchy moderate snow',
  'Moderate snow',
  'Patchy heavy snow',
  'Heavy snow',
  'Ice pellets',
  'Light rain shower',
  'Moderate or heavy rain shower',
  'Torrential rain shower',
  'Light sleet showers',
  'Moderate or heavy sleet showers',
  'Light snow showers',
  'Moderate or heavy snow showers',
  'Light showers of ice pellets',
  'Moderate or heavy showers of ice pellets',
  'Patchy light rain with thunder',
  'Moderate or heavy rain with thunder',
  'Patchy light snow with thunder',
  'Moderate or heavy snow with thunder',
];

const categorizeWeatherTypeForImage = (description) => {
  description = description.toLowerCase();
  if (
    description.includes('rain') ||
    (description.includes('drizzle') && !description.includes('freezing'))
  ) {
    return 'rainy';
  } else if (description.includes('sun')) {
    return 'sunny';
  } else if (description.includes('clear')) {
    return 'clear';
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
const generateDescription = (categorizedWeather, elongateOrNot, weatherData) => {
  if (elongateOrNot) {
    if (categorizedWeather === 'snowy') {
      return `Chance of snow: ${weatherData.chance_of_snow}%`;
    } else if (categorizedWeather === 'rainy') {
      return `Chance of rain: ${weatherData.chance_of_rain}%`;
    } else {
      return categorizedWeather.charAt(0).toUpperCase() + categorizedWeather.slice(1);
    }
  } else {
    if (categorizedWeather === 'snowy') {
      return `${weatherData.chance_of_snow}%`;
    } else if (categorizedWeather === 'rainy') {
      return `${weatherData.chance_of_rain}%`;
    } else {
      return categorizedWeather.charAt(0).toUpperCase() + categorizedWeather.slice(1);
    }
  }
};
const currentHour = new Date().getHours();
const timeOfTheDay = determineTimeOfTheDay(currentHour);

const filterDataFromWeatherAPI = (data) => {
  const forecastArr = [];
  const timeBreakPoints = [7, 13, 18, 22];
  const currentForecastDataPth = data.forecast.forecastday[0].hour[currentHour - 1];

  timeBreakPoints.forEach((point) => {
    const elongateOrNot = determineTimeOfTheDay(point) === timeOfTheDay ? true : false;
    const dayOrNight = point > 13 ? 'night' : 'day';
    const forecastDataPath = data.forecast.forecastday[0].hour[point - 1];

    const categorizedWeather = categorizeWeatherTypeForImage(forecastDataPath.condition.text);
    forecastArr.push({
      // lowercase afternoon, morning ... for CSS
      timeName: determineTimeOfTheDay(point),
      condition: categorizedWeather,
      temperature: elongateOrNot
        ? `${Math.trunc(currentForecastDataPth.temp_f)}°`
        : `${Math.trunc(forecastDataPath.temp_f)}°`,
      dayOrNight: dayOrNight,
      elongate: elongateOrNot,
      // first letter uppercase for displaying on the card
      displayedTime:
        determineTimeOfTheDay(point).charAt(0).toUpperCase() +
        determineTimeOfTheDay(point).slice(1),
      description: generateDescription(categorizedWeather, elongateOrNot, forecastDataPath),
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

export {
  determineTimeOfTheDay,
  generateDescription,
  categorizeWeatherTypeForImage,
  filterDataFromWeatherAPI,
  getForecastWeather,
  getGeolocation,
};
