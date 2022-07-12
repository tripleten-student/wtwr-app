const { NotFoundError } = require('../errors/not-found-error');
const { itemsNotFound } = require('../utils/error');

const Item = require('../models/clothingItem');
const BadRequestError = require('../errors/bad-request-error');

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

const createItem = (res, req, next) => {
  const {
    name,
    type,
    temperature,
    imageUrl,
  } = req.body;
  Item.create({
    name,
    type,
    temperature,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.send(item))
    .catch(next);
};

const deleteItem = (res, req, next) => {
  Item.findById({ _id: req.params.itemId })
    .orFail(() => new NotFoundError('That clothing item does not exist'))
    .then((item) => {
      if (req.user._id === item.owner._id.toString()) {
        Item.findByIdAndRemove({ _id: req.params.itemId })
          .orFail()
          .then((itemData) => res.send({ data: itemData }))
          .catch(next);
      }
    })
    .catch(() => {
      next(new BadRequestError('You cant delete that'));
    });
};

const likeItem = (res, req, next) => {};

const unlikeItem = (res, req, next) => {};

module.exports = {
  getAllItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
