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
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/clothing');

const router = express.Router();

router.get('/', getAllItems);

router.post('/', createItem);

router.delete(
  '/:ItemId',
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteItem,
);

router.put('/:ItemId/likes', likeItem);
router.delete('/:ItemId/likes', unlikeItem);

module.exports = router;
