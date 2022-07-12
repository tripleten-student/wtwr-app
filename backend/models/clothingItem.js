const mongoose = require('mongoose');
const user = require('./user');

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
  },
  // weather set as array assuming multiple types may be possible //
  temperature: {
    type: Number,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+/.test(
          v
        );
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('item', clothingItemSchema);
