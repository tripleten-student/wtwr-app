/**
 * This module takes care of all the requests made to the wtwr API
 * @module Api
 * @author [Shraddha](https://github.com/5hraddha)
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponseStatus = response => {
    return (response.ok)
      ? response.json()
      : Promise.reject(`Error Code: ${response.status} | Error Message: ${response.statusText}`);
  }

  /**
   * Update the user token in the request header when the user logs in or logs out.
   */
  updateAuthUserToken = (jwt) => {
    this._headers = { ...this._headers, authorization: `Bearer ${jwt}` };
  }

  /**
  * Get the current user data from the server using a GET request.
  */
  getCurrentUserData = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponseStatus);
  }

  /**
  * Updates the current user data from the server using a PATCH request.
  */
  updateCurrentUserData = ({ name, avatar }) => {
    return fetch(`${this._baseUrl}/users/me/profile`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        avatar: avatar,
      })
    })
      .then(this._checkResponseStatus);
  }

  /**
  * Updates the current user password from the server using a PATCH request.
  */
  updateCurrentUserPassword = ({ oldPassword, newPassword }) => {
    return fetch(`${this._baseUrl}/users/me/password`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        oldPassword,
        newPassword,
      })
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Updates the current user preferences from the server using a PATCH request.
   */
  updateCurrentUserPreferences = (preferences) => {
    return fetch(`${this._baseUrl}/users/me/preferences`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        preferences
      })
    })
      .then(this._checkResponseStatus);
  }

  /**
  * Deletes the current user's profile from the server using a DELETE request.
  */
  deleteCurrentUser = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Gets all the clothing items for the current user from the server using a GET request.
   */
  getAllClothingItems = () => {
    return fetch(`${this._baseUrl}/clothing`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Adds a new clothing item to the server using a POST request.
   */
  addNewClothingItem = ({ name, type, weather, imageUrl }) => {
    return fetch(`${this._baseUrl}/clothing`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        type,
        weather,
        imageUrl,
      })
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Updates the info of the given clothing item to the server using a PATCH request.
   */
  updateClothingItem = ({ itemId, name, type, weather, imageUrl }) => {
    return fetch(`${this._baseUrl}/clothing/${itemId}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        type,
        weather,
        imageUrl,
      })
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Deletes an existing clothing item from the server using a DELETE request.
   */
  deleteClothingItem = clothingItemId => {
    return fetch(`${this._baseUrl}/clothing/${clothingItemId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Changes the like status of an existing clothing item from the server using a PATCH request.
   */
  toggleClothingItemLikeStatus = clothingItemId => {
    return fetch(`${this._baseUrl}/clothing/${clothingItemId}/likes`, {
      method: "PATCH",
      headers: this._headers,
    })
      .then(this._checkResponseStatus);
  }

}

const BASE_URL =  process.env.REACT_APP_API_URL|| 'http://localhost:4000';

export default new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json"
  }
});