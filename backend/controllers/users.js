const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { HTTP_SUCCESS_OK } = require('../utils/error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { devkey } = require('../utils/config');

/**
 * The **users** module contains the controllers for users
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

const { NODE_ENV, WTWR_JWT_KEY } = process.env;

// Sign in
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? WTWR_JWT_KEY : devkey,
        {
          expiresIn: '7d',
        },
      );
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

// Sign up
const createUser = (req, res, next) => {
  const {
    email, password, name, avatar, preferences,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          'The user with the provided email already exists',
        );
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      avatar,
      preferences,
    }))
    .then((data) => res.status(201).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Missing or invalid email or password'));
      } else {
        next(err);
      }
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError('Users are not found'))
    .then((users) => res.status(HTTP_SUCCESS_OK).send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new NotFoundError('User ID not found'))
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User ID not found');
      }
      res.status(HTTP_SUCCESS_OK).send(user);
    })
    .catch(next);
};

// Change profile name and avatar
const updateUserProfile = (req, res, next) => {
  const currentUser = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    currentUser,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('User ID not found'))
    .then((user) => res.status(HTTP_SUCCESS_OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid name or avatar URL'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Invalid User ID'));
      } else {
        next(err);
      }
    });
};

// Change password
const updatePassword = (req, res, next) => {
  const currentUser = req.user._id;
  const { oldPassword, newPassword } = req.body;

  User.findById(currentUser)
    .select('+password')
    .orFail(new NotFoundError('User ID not found'))
    .then((data) => bcrypt
      .compare(oldPassword, data.password)
      .then((match) => {
        if (match) {
          return bcrypt.hash(newPassword, 10);
        }
        throw new UnauthorizedError('Wrong Old Password');
      })
      .then((hash) => {
        User.findByIdAndUpdate(
          currentUser,
          { password: hash },
          {
            new: true,
            runValidators: true,
          },
        )
          .then((user) => res.status(HTTP_SUCCESS_OK).send({ data: user }))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new BadRequestError('Invalid password'));
            } else if (err.name === 'CastError') {
              next(new BadRequestError('Invalid User ID'));
            } else {
              next(err);
            }
          });
      }))
    .catch(next);
};

const deleteUser = (req, res, next) => {
  const currentUser = req.user._id;
  User.findByIdAndRemove(currentUser)
    .orFail(new NotFoundError('User ID not found'))
    .then((user) => res.status(HTTP_SUCCESS_OK).send({ data: user }))
    .catch(() => {
      next(new BadRequestError('Cannot delete user'));
    });
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUser,
  updateUserProfile,
  updatePassword,
  deleteUser,
};
