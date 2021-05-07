import { Fragment } from "react";
import Moment from "react-moment";
import { leaveGame } from "../actions/game";
import players from "./player.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";


function Player({ game, leaveGame }) {
  return (
    <div className="player-deatils">
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
                <div className="play">
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
                <div onClick={() => leaveGame(game.gameID, player.name)}>X</div>
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
