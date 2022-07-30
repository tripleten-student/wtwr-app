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
} = require('../controllers/users');
const {
  validateRequestAuth,
  validateUserId,
  validatePasswordChange,
} = require('../middleware/validation');

router.get('/', validateRequestAuth, getUsers);
router.get('/me', validateRequestAuth, getCurrentUser);
router.get('/:userId', validateRequestAuth, validateUserId, getUser);
router.patch('/me/profile', validateRequestAuth, updateUserProfile);
router.patch(
  '/me/password',
  validateRequestAuth,
  validatePasswordChange,
  updatePassword,
);
router.delete('/me', validateRequestAuth, deleteUser);

module.exports = router;
