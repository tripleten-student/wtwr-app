const router = require('express').Router();

/**
 * The **users** module contains the routes for users
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

const {
  getUsers,
  getUser,
  updateUserProfile,
  updatePassword,
  deleteUser,
  getCurrentUser,
  updateUserPreferences,
  updateUserTemperatureSelection,
} = require('../controllers/users');

const {
  validateUserId,
  validatePasswordChange,
  validatePreferences,
  validateProfileChanges,
  validateTemperatureSelection,
} = require('../middleware/validation');

router.get('/', validateUserId, getUsers);

router.get('/me', validateUserId, getCurrentUser);

router.get('/:userId', validateUserId, getUser);

router.patch('/me/profile', validateProfileChanges, updateUserProfile);

router.patch('/me/preferences', validatePreferences, updateUserPreferences);

router.patch('/me/temperature', validateTemperatureSelection, updateUserTemperatureSelection);

router.patch('/me/password', validatePasswordChange, updatePassword);

router.delete('/me', validateUserId, deleteUser);

module.exports = router;
