const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

/**
 * The **user** module contains the schemas and models of users
 * and a function to find users by their credentials
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 * @author [Devin Jaggernauth](https://github.com/mentalcaries)
 */

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'You must enter a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (value) => (value === '' ? true : validator.isURL),
      message: 'You must enter a valid URL',
    },
  },
  preferences: [
    {
      type: String,
      enum: ['t-shirt', 'shirt', 'jeans', 'skirt', 'dress', 'sneakers', 'boots', 'jacket', 'coat', 'sunglasses', 'shorts', 'sport-pants', 'down-jacket', 'headwear'],
    },
  ],
  temperatureSelection: {
    type: String,
    enum: ['F', 'C'],
    default: 'F',
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return Promise.reject(new Error('Incorrect email or password'));
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
