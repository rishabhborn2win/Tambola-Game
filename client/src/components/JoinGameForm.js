import { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import {Button} from 'react-bootstrap'

import PropTypes from "prop-types";
import { notifyFill, joinGame } from "../actions/game";
import Heading from "./Heading";
const JoinGameForm = ({match, notifyFill, joinGame, game }) => {
  const [formData, setFormData] = useState({
    host: "",
    gameID: match.params.id
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
    if (playername.length < 6) {
      notifyFill("Player Name Should have more then 6 Char");
    } else {
      joinGame(playername, gameID);
      <Redirect to="/play" />;
    }
  };
  return (
    <Fragment>
      <Heading text="Join Game," />
      {/* <span class="text-span">Join Game Form:-</span> */}
      <div className="container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="form-input-group">
            <label class="omrs-input-underlined">
              <input
                className="input-fields"
                placeholder="Player Name"
                type="text"
                id="playername"
                name="playername"
                onChange={(e) => onChange(e)}
              ></input>
            </label>
          </div>
          <div class="omrs-input-group">
            <label class="omrs-input-underlined">
              <input
              value={gameID}
                className="input-fields"
                placeholder="GameID"
                type="text"
                id="gameID"
                name="gameID"
                onChange={(e) => onChange(e)}
              ></input>
            </label>
          </div>
          <input
            type="submit"
            value="Join!"
            className="btn-lg btn-primary float-right"
          ></input>
        </form>
      </div>
    </Fragment>
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
