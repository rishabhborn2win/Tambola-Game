export const findPlayerIndex = (username) => {
  var playerIndex = -1;
  if (game.players) {
    game.players.map((player, index) => {
      if (player.name === username) {
        playerIndex = index;
      }
      return 0;
    });
    return playerIndex;
  } else {
    return -1;
  }
};
