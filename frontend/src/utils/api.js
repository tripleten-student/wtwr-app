/**
 * This module takes care of all the requests made to the wtwr API
 * @module Api
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 * more authors to be added later
 */

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getCurrentUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        ...this._headers,
      },
    }).then(this._checkResponse);
  }

  deleteUser(token) {
    return fetch(`${this._baseUrl}/users/me/delete`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._headers,
      },
    }).then(this._checkResponse);
  }

  updateUserProfile({ name, avatar }, token) {
    return fetch(`${this._baseUrl}/users/me/profile`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._headers,
      },
      body: JSON.stringify({ name, avatar }),
    }).then(this._checkResponse);
  }

  updatePassword({ oldPassword, newPassword }, token) {
    return fetch(`${this._baseUrl}/users/me/password`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        ...this._headers,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }
}

// add registered URL later
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
