import { Fragment } from "react";
import Moment from "react-moment";
import { leaveGame } from "../actions/game";
import players from "./player.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { WhatsappIcon } from "react-share";



function Player({ game, leaveGame }) {

  // With async/await
  
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
                <div onClick={() => leaveGame(game.gameID, player.name)} className="btn btn-primary">X</div>{" "}
                <div>
          <a
            href={`whatsapp://send?text=This is a Invite to Tambola Numbers!🙏🏻 GameID: ${game.gameID} ${window.location}/join/${player.tickets}/${game.gameID}/${player.name} http://www.example.com/image.jpg`}
            data-action="share/whatsapp/share"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <WhatsappIcon size={20} round={true} />
          </a>
        </div>                <br />
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
