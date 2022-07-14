const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

/**
 * The **validation** module contains the validators to validate server request bodies
 *
 *@author [Devin Jaggernauth](https://github.com/mentalcaries)
 *@author [Hoang Le Chau](https://github.com/hoanglechau)
 */

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('The URL is not valid');
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.message('The email is not valid');
};

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'The name field needs at least 2 characters',
      'string.max': 'The maximum length of the name field is 30 characters',
      'string.empty': 'The name field is empty',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'The about field needs at least two characters',
      'string.max': 'The maximum length of the about field is 30 characters',
      'string.empty': 'The about field is empty',
    }),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().min(8).required().messages({
      'string.min': 'The password field needs at least 8 characters',
      'string.empty': 'The password field is empty',
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().min(8).required().messages({
      'string.min': 'The password field needs at least 8 characters',
      'string.empty': 'The password field is empty',
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Invalid User ID');
      }),
  }),
});

const validateRequestAuth = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required().messages({
        'string.empty': 'Authorization required',
      }),
    })
    .unknown(true),
});

module.exports = {
  validateLogin,
  validateUser,
  validateRequestAuth,
  validateUserId,
};
