const express = require('express');
/**
 * The **clothing** module contains the routes for clothing items
 *
 * @author [Devin Jaggernauth](https://github.com/mentalcaries)
 */

const {
  getAllItems,
  createItem,
  editItem,
  deleteItem,
  toggleLikeStatus,
} = require('../controllers/clothing');
const { validateItem, validateUserId } = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllItems);

router.post('/', validateItem, createItem);

router.patch('/:ItemId', validateItem, editItem);

router.delete('/:ItemId', validateUserId, deleteItem);

router.patch('/:ItemId/likes', toggleLikeStatus);

module.exports = router;
