import React from "react";
import Moment from "react-moment";
import man from "./man.png";

export default function Host({ game, style, total }) {
  if (total > 0) {
    var msg = `Total Number Called: ${total}`;
  } else {
    msg = "Game is Yet To Start!";
  }
  return (
    <div className="game-details">
      <h2 style={{ color: "white" }}>Game Details:- </h2>
      <div className="profile">
        <img src={man} alt="Dp" />
        <span className="host-details">{game ? game.host : ""}</span>
      </div>
      <div className="desc">
        <input
          type="textarea"
          className="desc-input"
          placeholder="Description"
          value={msg}
          disabled
        ></input>
      </div>
      <div className="create-details">
        <h4 style={{ color: "white" }}>Game Created At: </h4>
        <Moment format="D MMM YYYY">{game ? game.date : ""}</Moment>{" "}
        <Moment format="hh:mm:ss">{game ? game.date : ""}</Moment>
      </div>
    </div>
  );
}
