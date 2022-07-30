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

const router = express.Router();

router.get('/', getAllItems);

router.post('/', createItem);

router.patch(
  '/:ItemId',
  // celebrate({
  //   body: Joi.object().keys({
  //     _id: Joi.string().hex().length(24),
  //   }),
  // }),
  editItem,
);
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
