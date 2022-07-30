const express = require('express');
const { celebrate, Joi } = require('celebrate');

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
const { validateItem } = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllItems);

router.post('/', validateItem, createItem);

router.patch('/:ItemId', validateItem, editItem);

router.delete(
  '/:ItemId',
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteItem,
);

router.patch('/:ItemId/likes', toggleLikeStatus);

module.exports = router;
