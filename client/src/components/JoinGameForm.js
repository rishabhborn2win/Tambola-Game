import { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { notifyFill, joinGame } from "../actions/game";
const JoinGameForm = ({ notifyFill, joinGame, game }) => {
  const [formData, setFormData] = useState({
    host: "",
  });

  if (game) {
    return <Redirect to="/play"></Redirect>;
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { playername, gameID } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (playername === "") {
      notifyFill("Write down Your name");
    } else {
      joinGame(playername, gameID);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <label for="playername">
          Enter <b>Unique</b> Username
        </label>
        <input
          type="text"
          id="playername"
          name="playername"
          onChange={(e) => onChange(e)}
        ></input>
        <label for="gameID">Enter GameID</label>
        <input
          type="text"
          id="gameID"
          name="gameID"
          onChange={(e) => onChange(e)}
        ></input>
        <input type="submit" value="Join Game"></input>
      </form>
    </div>
  );
};

JoinGameForm.prototype = {
  notifyFill: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game.game,
});

export default connect(mapStateToProps, { notifyFill, joinGame })(
  withRouter(JoinGameForm)
);
