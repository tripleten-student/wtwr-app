const { NotFoundError } = require('../errors/not-found-error');
const { BadRequestError } = require('../errors/bad-request-error');
const { UnauthorizedError } = require('../errors/unauthorized-error');
const {
  itemsNotFound,
  itemNotFound,
  cannotDelete,
  userNotAuthorised,
} = require('../utils/error');

const Item = require('../models/clothingItem');

/**
 * The **clothing** module contains the controllers for clothing items
 *
 * @author [Devin Jaggernauth](https://github.com/mentalcaries)
 */

const getAllItems = (req, res, next) => {
  Item.find({ owner: req.owner._id })
    .orFail(() => {
      throw new NotFoundError(itemsNotFound);
    })
    .then((clothingItems) => {
      res.send(clothingItems);
    })
    .catch(next);
};

const createItem = (req, res, next) => {
  const {
    name,
    type,
    weather,
    imageUrl,
  } = req.body;
  Item.create({
    name,
    type,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.send(item))
    .catch(next);
};

const editItem = (req, res, next) => {
  const currentUser = req.user._id;
  const itemId = req.params.ItemId;
  const {
    name,
    type,
    weather,
    imageUrl,
  } = req.body;

  Item.findById(itemId)
    .orFail()
    .then((itemData) => {
      if (itemData.owner.toString() !== currentUser) {
        throw new UnauthorizedError(userNotAuthorised);
      }
      Item.findByIdAndUpdate(
        itemId,
        {
          name,
          type,
          weather,
          imageUrl,
        },
        { new: true },
      )
        .orFail()
        .then((updatedData) => res.send(updatedData))
        .catch(next);
    })
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const itemId = req.params.ItemId;
  const currentUser = req.user._id;
  Item.findById({ _id: itemId })
    .orFail(() => new NotFoundError(itemNotFound))
    .then((item) => {
      if (currentUser !== item.owner._id.toString()) {
        throw new UnauthorizedError(userNotAuthorised);
      }
      Item.findByIdAndRemove({ _id: itemId })
        .orFail(() => new BadRequestError(cannotDelete))
        .then((itemData) => res.send({ data: itemData }))
        .catch(next);
    })
    .catch(next);
};

const toggleLikeStatus = (req, res, next) => {
  const currentUser = req.user._id;
  const itemId = req.params.ItemId;
  Item.findById(itemId)
    .orFail()
    .then((itemData) => {
      if (itemData.owner.toString() !== currentUser) {
        throw new UnauthorizedError(userNotAuthorised);
      }
      Item.findByIdAndUpdate(
        itemId,
        { isLiked: !itemData.isLiked },
        { new: true },
      )
        .orFail()
        .then((updatedData) => res.send(updatedData))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getAllItems,
  createItem,
  editItem,
  deleteItem,
  toggleLikeStatus,
};
