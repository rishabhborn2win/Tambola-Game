import { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

export default function Player({ game }) {
  return (
    <div>
      <h2>Players Joined:-</h2>
      {game.players.map((player) => {
        return (
          <Fragment>
            <span>
              <b>Name: </b>
            </span>
            <span>{player.name} </span>
            <span>
              <b>Joined At: </b>{" "}
            </span>
            <span>
              <Moment>{player.timeofjoin}</Moment>
            </span>
            <br />
          </Fragment>
        );
      })}
    </div>
  );
};

