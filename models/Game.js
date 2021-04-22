const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
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
    players: [
      {
        name: {
          type: String,
        },
        timeofjoin: {
          type: Date,
        },
        tickets: {
          type: String,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
GameSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = Game = mongoose.model("game", GameSchema);
