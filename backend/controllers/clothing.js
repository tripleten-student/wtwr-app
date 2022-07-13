const { NotFoundError } = require('../errors/not-found-error');
const { BadRequestError } = require('../errors/bad-request-error');
const { itemsNotFound, itemNotFound, cannotDelete } = require('../utils/error');

const Item = require('../models/clothingItem');

const getAllItems = (req, res, next) => {
  Item.find()
    .orFail(() => {
      throw new NotFoundError(itemsNotFound);
    })
    .then((savedArticles) => {
      res.send(savedArticles);
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
    owner: '61e6aefe17929d486d4c77de',
  })
    .then((item) => res.send(item))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  Item.findById({ _id: req.params.itemId })
    .orFail(() => new NotFoundError(itemNotFound))
    .then((item) => {
      if (req.user._id === item.owner._id.toString()) {
        Item.findByIdAndRemove({ _id: req.params.itemId })
          .orFail()
          .then((itemData) => res.send({ data: itemData }))
          .catch(next);
      }
    })
    .catch(() => {
      next(new BadRequestError(cannotDelete));
    });
};

const likeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.ItemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((itemData) => res.send(itemData))
    .catch(next);
};

const unlikeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.ItemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((itemData) => res.send(itemData))
    .catch(next);
};

module.exports = {
  getAllItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
