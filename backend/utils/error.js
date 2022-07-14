/**
 * The **error** module contains the variables for error codes
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

module.exports.HTTP_SUCCESS_OK = 200;
module.exports.HTTP_CLIENT_ERROR_BAD_REQUEST = 400;
module.exports.HTTP_CLIENT_ERROR_NOT_FOUND = 404;
module.exports.HTTP_INTERNAL_SERVER_ERROR = 500;

const itemsNotFound = 'No items were found';
const itemNotFound = 'That clothing item does not exist';
const cannotDelete = 'You cant delete that';

module.exports = {
  itemsNotFound,
  itemNotFound,
  cannotDelete,
};
