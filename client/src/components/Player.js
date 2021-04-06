import { Fragment } from "react";
import Moment from "react-moment";
import players from "./player.png";

export default function Player({ game }) {
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
                      <Moment format="D MMM YYYY">{player.timeofjoin}</Moment>{" at "}
                      <Moment format="hh:mm:ss">{player.timeofjoin}</Moment>
                    </span>
                  </div>
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
