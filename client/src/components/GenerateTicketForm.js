import React, { Fragment, useState } from "react";
import { generateTicket, notifyFill } from "../actions/game";
import Heading from "./Heading";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
// import {Button} from 'react-bootstrap'
import PropTypes from "prop-types";

const GenerateTicketForm = ({ tickets, generateTicket, notifyFill }) => {
  const [formData, setFormData] = useState({
    playername: localStorage.playerid ? localStorage.username: "",
    noOfTickets: 0,
    gameID: localStorage.playerid
  });
//   if(localStorage.username) setFormData({...formData, playername: localStorage.username})
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { playername, noOfTickets } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (playername.length < 6) {
      notifyFill("Player Name Should have more then 6 Char");
    } else if (noOfTickets < 1 || noOfTickets > 6) {
      notifyFill("No Of tickets can not be more then 6");
    } else {
      generateTicket(formData);
    }
  };
  return (
    <div className="content-post">
      <Fragment>
        <Heading text="Generate Ticket" />
        {/* <span class="text-span">Join Game Form:-</span> */}
        <div className="container">
          <form onSubmit={(e) => onSubmit(e)}>
            <div class="form-input-group">
              <label class="omrs-input-underlined">
                <input
                  className="i"
                  placeholder="Name"
                  type="text"
                  id="playername"
                  name="playername"
                  value={playername}
                  disabled
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
              value="Generate"
              className="btn-lg btn-primary float-right"
            ></input>
          </form>
        </div>
      </Fragment>
    </div>
  );
};
GenerateTicketForm.prototype = {
  notifyFill: PropTypes.func.isRequired,
  generateTicket: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  tickets: state.game.tickets,
});

export default connect(mapStateToProps, { notifyFill, generateTicket })(
  withRouter(GenerateTicketForm)
);
