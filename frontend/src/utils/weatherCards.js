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

function categorizeWeatherTypeForImage(description) {
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
  } else if (description.includes('cloud')) {
    return 'cloudy';
  } else {
    return 'not found';
  }
}
// use this for testing, you will see all 49 items categoried in 7 conditions
// console.log(
//   uniqueDayAndNightConditions.map((description) =>
//     categorizeWeatherTypeForImage(description)
//   )
// );
function determineTimeOfTheDay(currentHour) {
  if (currentHour >= 5 && currentHour < 12) {
    return 'morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'afternoon';
  } else if (currentHour >= 17 && currentHour < 20) {
    return 'evening';
  } else {
    return 'overnight';
  }
}
function shortenDescription(description) {
  const regex = /\d{1,3}%/gi;
  return description.match(regex)[0];
}

export { determineTimeOfTheDay, shortenDescription, categorizeWeatherTypeForImage };
