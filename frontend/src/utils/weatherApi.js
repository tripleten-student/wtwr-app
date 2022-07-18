/** This module takes care of the geolocation API and weather API logic
 * It reads the user's location (longitutde and latitude) and stores the information in local storage
 * Then sends longitutde and latitude to the weahter 'forecast' API, gets back weather forcast information on an hourly basis
 *
 * @author [Yuffie Hu](https://github.com/yuff1006)
 */
export default class weatherAPI {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getGeolocation = () => {
    /** if successfully obtained user location, store it in local storage */
    // const successCallBack = ({ coords }) => {
    //   this._userLocation = {
    //     latitude: coords.latitude,
    //     longitude: coords.longitude,
    //   };
    //   localStorage.setItem('userLocation', JSON.stringify(this._userLocation));
    //   return this._userLocation;
    // };
    // /** when user didn't allow location sharing, check to fetch data from the last read, if present. If not, default to New York City coordinates */
    // const failCallBack = () => {
    //   if (localStorage.getItem('userLocation')) {
    //     this._userLocation = JSON.parse(localStorage.getItem('userLocation'));
    //   }
    //   this._userLocation = {
    //     latitude: '40.730610',
    //     longitude: '-73.935242',
    //   };
    //   return this._userLocation;
    // };
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
}
