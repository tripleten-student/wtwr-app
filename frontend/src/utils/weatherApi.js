/** This module takes care of the geolocation API and weather API logic
 * It reads the user's location (longitutde and latitude) and stores the information in local storage
 * Then sends longitutde and latitude to the weahter 'forecast' API, gets back weather forcast information on an hourly basis
 *
 * @author [Yuffie Hu](https://github.com/yuff1006)
 */
export class weatherAPI {
  constructor({ baseUrl, headers, forecastNumOfDays }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._forecastMethod = '/forecast.json';
    this._forecastNumOfDays = forecastNumOfDays;
    this._APIkey = '';
  }

  getGeolocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  getForecastWeather = (location) => {
    /** location passed in will be an object with latitude and longitude keys
     * the API takes the two combined(latitude first) seperated by a comma
     */
    const parsedLocation = `${location.latitude},${location.longitude}`;
    return fetch(
      `${this._baseUrl}${this._forecastMethod}?key=${this._APIkey}&q=${parsedLocation}&days=${this._forecastNumOfDays}`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  };
}

export const weatherForecastApi = new weatherAPI({
  baseUrl: 'http://api.weatherapi.com/v1',
  headers: {
    authorization: '',
  },
  forecastNumOfDays: '1',
});
