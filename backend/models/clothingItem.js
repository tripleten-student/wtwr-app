const mongoose = require('mongoose');
const user = require('./user');

/**
 * The **clothing** module contains the schemas and models for clothing items
 *
 * @author [Devin Jaggernauth](https://github.com/mentalcaries)
 */

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  type: {
    type: String,
    required: true,
    enum: ['t-shirt', 'shirt', 'jeans', 'skirt', 'dress', 'sneakers', 'boots', 'jacket', 'coat', 'sunglasses', 'shorts', 'sport-pants', 'down-jacket', 'headwear'],
  },
  weather: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+/.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('item', clothingItemSchema);
