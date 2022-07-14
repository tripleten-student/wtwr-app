const router = require('express').Router();

/**
 * The **users** module contains the routes for users
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateName,
  updateAvatar,
  updatePassword,
  deleteUser,
} = require('../controllers/users');
const {
  validateRequestAuth,
  validateUserId,
} = require('../middleware/validation');

router.get('/', validateRequestAuth, getUsers);
router.get('/me', validateRequestAuth, getCurrentUser);
router.get('/:id', validateRequestAuth, validateUserId, getUserById);
router.patch('/me', validateRequestAuth, updateName);
router.patch('/me/avatar', validateRequestAuth, updateAvatar);
router.patch('/me/password', validateRequestAuth, updatePassword);
router.delete('/me', validateRequestAuth, deleteUser);

module.exports = router;
