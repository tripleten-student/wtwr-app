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
} = require('../controllers/users');
const {
  validateRequestAuth,
  validateUserId,
} = require('../middleware/validation');

router.get('/', validateRequestAuth, getUsers);
router.get('/:userId', validateRequestAuth, validateUserId, getUser);
router.patch('/me/profile', validateRequestAuth, updateUserProfile);
router.patch('/me/password', validateRequestAuth, updatePassword);
router.delete('/me/delete', validateRequestAuth, deleteUser);

module.exports = router;
