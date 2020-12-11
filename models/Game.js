const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  gameID: {
    type: Number,
    default: Math.ceil(Math.random() * 1000),
  },
  host: {
    type: String,
    required: true,
  },
  numbers: [
    {
      number: {
        type: Number,
      },
      called: {
        type: Boolean,
        default: false,
      },
      calledTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Game = mongoose.model("game", GameSchema);
