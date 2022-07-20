/**
 * The **error** module contains the variables for error codes
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

const HTTP_SUCCESS_OK = 200;
const HTTP_CLIENT_ERROR_BAD_REQUEST = 400;
const HTTP_CLIENT_ERROR_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

const itemsNotFound = 'No items were found';
const itemNotFound = 'That clothing item does not exist';
const cannotDelete = 'You cant delete that';
const userNotAuthorised = 'User is not authorized to make changes';

module.exports = {
  HTTP_SUCCESS_OK,
  HTTP_CLIENT_ERROR_BAD_REQUEST,
  HTTP_CLIENT_ERROR_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
  itemsNotFound,
  itemNotFound,
  cannotDelete,
  userNotAuthorised,
};
