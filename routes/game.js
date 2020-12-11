const express = require("express");
const router = express.Router();
const Game = require('../models/Game');

//route     POST /game
//desc:     create a game
//access:   public
router.post('/', async(req, res) => {
    const {host} = req.body;
    if(!host){
        try {
            const game = await Game
            game = new Game({
                host
            })
            await game.save();
            
        } catch (err) {
            console.log(err.message);
        }
    }
})

module.exports = router;
