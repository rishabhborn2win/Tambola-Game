const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

//route     POST /game
//desc:     create a game
//access:   public
router.post("/", async (req, res) => {
  const host = req.body.host;
  try {
    let game = await Game.findOne({ host: host });
    if (game) {
      return res.status(400).json({ msg: "One game is already Created" });
    }
    game = new Game({
      host: host,
      numbers: [],
    });

    function pick(n, min, max) {
      var values = [],
        i = max;
      while (i >= min) values.push(i--);
      var results = [];
      var maxIndex = max;
      for (i = 1; i <= n; i++) {
        maxIndex--;
        var index = Math.floor(maxIndex * Math.random());
        results.push(values[index]);
        values[index] = values[maxIndex];
      }
      return results;
    }
    var list = pick(90, 1, 90);

    list.forEach((num) => {
      game.numbers.push({ number: num });
    });

    await game.save();
    res.json({ msg: "New Game Created", data: game });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//route     PUT /game/numbers
//desc:     Put numbers
//access:   public
router.put("/numbers", async (req, res) => {
  const newNum = {
    number,
  };
});

module.exports = router;
