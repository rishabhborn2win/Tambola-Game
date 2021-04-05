import { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import {Button} from 'react-bootstrap'

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
      <Redirect to='/play' />
    }
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
     
      <div class="omrs-input-group">
				<label class="omrs-input-underlined">
        <input
          type="text"
          id="playername"
          name="playername"
          onChange={(e) => onChange(e)}
        ></input>
				  <span class="omrs-input-label">Enter Unique Username</span>
					{/* <span class="omrs-input-helper">e.g Rishabh, Digvijay, etc..</span> */}
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7z"/></svg>
				</label>
			</div>
      <div class="omrs-input-group">
				<label class="omrs-input-underlined">
        <input
          type="text"
          id="gameID"
          name="gameID"
          onChange={(e) => onChange(e)}
        ></input>
				  <span class="omrs-input-label">Enter Game ID</span>
					{/* <span class="omrs-input-helper">e.g 98765432 etc..</span> */}
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7z"/></svg>
				</label>
			</div>
        <input type="submit"></input>
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
