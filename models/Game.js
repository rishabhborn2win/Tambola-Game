const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  gameID: {
    type: Number,
    default: Math.ceil(Math.random() * 100000000),
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
  players: [
    {
      name: {
        type: String,
      },
      timeofjoin: {
        type: Date,
      },
      tickets: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket"
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Game = mongoose.model("game", GameSchema);
