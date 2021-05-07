import { Fragment, useState } from "react";
import Moment from "react-moment";
import { leaveGame } from "../actions/game";
import players from "./player.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SinglePlayerDetail from "./SInglePlayerDetail";

function Player({ game, leaveGame }) {
  

  //open player details
  const [openPlayer, setOpenPlayer] = useState(false);

  return (
    <div className="player-deatils">
      <div className="hidden-qr"></div>
      <div className="title-player">
        <h2>Players Joined:-</h2>
      </div>
      <div className="player">
        {game.players.map((player) => {
          return (
            <div className="design-player">
              <Fragment>
                <div>
                  <img src={players} alt="player dp" />
                </div>
                <div className="play"  onClick={() => setOpenPlayer(true)}>
                  <div>
                    <span>
                      <b>Name: </b>
                    </span>
                    <span>{player.name} </span>
                  </div>
                  <div>
                    <span>
                      <b>Joined on: </b>{" "}
                    </span>
                    <span>
                      <Moment format="D MMM YYYY">{player.timeofjoin}</Moment>
                      {" at "}
                      <Moment format="hh:mm:ss">{player.timeofjoin}</Moment>
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => leaveGame(game.gameID, player.name)}
                  className="btn btn-primary"
                >
                  X
                </div>
                <div>
                  {openPlayer ? <SinglePlayerDetail game={game} player={player} setOpenPlayer={setOpenPlayer} /> : ""}
                </div>
                <br />
              </Fragment>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Player.prototype = {
  leaveGame: PropTypes.func.isRequired,
};

export default connect(null, { leaveGame })(Player);
