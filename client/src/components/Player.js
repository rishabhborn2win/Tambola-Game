import { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Player = ({ game }) => {
  return (
    <div>
      {game.players.map((player) => {
        return (
          <Fragment>
            <span>Name: </span>
            <span>{player.name}</span>
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
