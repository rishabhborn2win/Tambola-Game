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
      players: [],
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
    res.json(game);
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

//route     PUT /game/join/play
//desc:     join a game
//access:   public
router.put("/join/play", async (req, res) => {
  const gameid = req.body.id;
  const player = req.body.playername;
  try {
    let game = await Game.findOne({ gameID: gameid });
    if (!game) {
      return res.status(400).json({ msg: "Invalid Game Id" });
    }

    game.players.push({
      name: player,
      timeofjoin: new Date(),
    });

    await game.save();
    res.status(200).json(game);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//route     GET /game/join/playerid
//desc:     load a join a game
//access:   private
router.get("/join/:id", async (req, res) => {
  const playerid = req.params.id;
  try {
    let game = await Game.findOne({ gameID: playerid });
    if (!game) res.status(400).send("No game for the gameid You entered!");
    res.status(200).json(game);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//route     GET /game
//desc:     get list of the games
//access:   public
router.get("/", async (req, res) => {
  try {
    let games = await Game.find({});
    if (!games) res.status(400).json({ msg: "No game found!" });

    res.status(200).json(games);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
});

//route     GET /game/:id
//desc:     get game by id
//access:   public
router.get("/:id", async (req, res) => {
  const gameid = req.params.id;
  try {
    let game = await Game.findById(gameid);
    if (!game) res.status(400).json({ msg: "No game found!" });

    res.status(200).json(game);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
});

//route     DELETE /game/delete/:id
//desc:     DELETE the game by id
//access:   private
router.delete("/delete/:id", async (req, res) => {
  const gameid = req.params.id;
  try {
    let game = await Game.findByIdAndDelete(gameid);
    res.status(200).json({
      msg: "game deleted",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//route     PUT /game/:id/next
//desc:     To call the number and save the current status
//access:   private
router.put("/:id/next", async (req, res) => {
  const gameid = req.params.id;
  try {
    let game = await Game.findById(gameid);
    for (var i = 0; i < 90; i++) {
      if (!game.numbers[i].called) {
        game.numbers[i].called = true;
        game.numbers[i].calledTime = new Date();
        break;
      }
    }
    await game.save();
    res.status(200).json(game);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
