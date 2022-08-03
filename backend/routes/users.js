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
} = require('../controllers/users');
const {
  validateUserId,
  validatePasswordChange,
  validatePreferences,
  validateProfileChanges,
  validateRequestAuth,
} = require('../middleware/validation');

router.get('/', validateRequestAuth, validateUserId, getUsers);
router.get('/me', validateRequestAuth, validateUserId, getCurrentUser);
router.get('/:userId', validateRequestAuth, validateUserId, getUser);
router.patch('/me/profile', validateRequestAuth, validateProfileChanges, updateUserProfile);
router.patch('/me/preferences', validateRequestAuth, validatePreferences, updateUserPreferences);
router.patch('/me/password', validateRequestAuth, validatePasswordChange, updatePassword);
router.delete('/me', validateUserId, deleteUser);

module.exports = router;
