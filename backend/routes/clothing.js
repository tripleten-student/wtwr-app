const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getAllItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/clothing');

const router = express.Router();

// GET /items - returns all items
// POST /items - creates a new item
// DELETE /items/:itemId - deletes an item by _id

// PUT /items/:itemId/likes — like an item
// DELETE /items/:itemId/likes — unlike an item

router.get('/', getAllItems);

router.post('/', createItem);

router.delete(
  '/:clothingItemId',
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteItem,
);

router.put('/:clothingItemId/likes', likeItem);
router.delete('/:clothingItemId/likes', unlikeItem);

module.exports = router;
