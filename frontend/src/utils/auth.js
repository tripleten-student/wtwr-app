/**
 * This module enables API requests related to registration and authorization using API
 * @module Auth
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 * @author [Devin](https://github.com/mentalcaries)
 */

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

const checkServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const register = ({ email, password, name, avatar, preferences }) => {
  
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name, avatar, preferences }),
  }).then(checkServerResponse);
};

const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkServerResponse);
};

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkServerResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
      return;
    });
};

// Put the registered URL here later

export { register, login, checkToken };
