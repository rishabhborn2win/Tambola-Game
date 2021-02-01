import { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Player = ({ game }) => {
  return (
    <div>
      {game.players.map((player) => {
        return (
          <Fragment>
            <span><b>Name: </b></span>
            <span>{player.name}   </span>
            <span><b>Joined At: </b> </span>
            <span><Moment>{player.timeofjoin}</Moment></span>
            <br />
          </Fragment>
        );
      })}
    </div>
  );
};

Player.prototype = {
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game.game,
});

export default connect(mapStateToProps, {})(Player);
