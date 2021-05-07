import React, { Fragment, useState } from "react";
import { generateTicket, joinGame, notifyFill, addPlayer } from "../actions/game";
import Heading from "./Heading";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import {Button} from 'react-bootstrap'
import PropTypes from "prop-types";

const AddPlayerForm = ({ game, generateTicket, notifyFill, addPlayer }) => {
  const players = game ? game.players : ["Loading.."];
  const [formData, setFormData] = useState({
    playername: "",
    noOfTickets: 0,
    gameID: game ? game._id : "",
    playerid: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { playername, noOfTickets, gameID } = formData;

  const onSubmit =  (e) => {
    e.preventDefault();
    if (playername.length < 3) {
      notifyFill("Player Name Should have more then 3 Char");
    } else if (noOfTickets < 1 || noOfTickets > 6) {
      notifyFill("No Of tickets can not be more then 6");
    } else {
      addPlayer(playername, gameID, noOfTickets);
    }
  };

  return (
    <div className="content-post">
      <Fragment>
        <Heading text="Add Player" />
        {/* <span class="text-span">Join Game Form:-</span> */}
        <div className="container">
          <form onSubmit={(e) => onSubmit(e)}>
            <div class="form-input-group">
              <label class="omrs-input-underlined">
                <input
                  type="select"
                  className="i"
                  placeholder="Name"
                  type="text"
                  id="playername"
                  name="playername"
                  value={playername}
                  onChange={(e) => onChange(e)}
                ></input>
              </label>
            </div>
            <div class="omrs-input-group">
              <label class="omrs-input-underlined">
                <input
                  className="input"
                  placeholder="No. Of Tickets"
                  type="text"
                  id="noOfTickets"
                  name="noOfTickets"
                  onChange={(e) => onChange(e)}
                ></input>
              </label>
            </div>
            <input
              type="submit"
              value="Add"
              className="btn-lg btn-primary float-right"
            ></input>
          </form>
        </div>
      </Fragment>
    </div>
  );
};
AddPlayerForm.prototype = {
  notifyFill: PropTypes.func.isRequired,
  generateTicket: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
      tickets: state.game.tickets,
});

export default connect(mapStateToProps, { notifyFill, generateTicket, addPlayer })(
  withRouter(AddPlayerForm)
);
