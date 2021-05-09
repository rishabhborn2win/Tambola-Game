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
          type: mongoose.Schema.Types.ObjectId,
          ref: "ticket",
        },
        score: {
          type: Number,
          default: 0
        }
      },
    ],
    dividends: {
      firstLine: {
        winner: {
          type: String
        },
        createdAt: {
          type: Date,
          default: Date.now()
        }
      },
      secondLine: {
        winner: {
          type: String
        },
        createdAt: {
          type: Date,
          default: Date.now()
        }
      },
      thirdLine: {
        winner: {
          type: String
        },
        createdAt: {
          type: Date,
          default: Date.now()
        }
      },
      house: {
        winner: {
          type: String
        },
        createdAt: {
          type: Date,
          default: Date.now()
        }
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
GameSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = Game = mongoose.model("game", GameSchema);
