import React, { Fragment, useState } from "react";
import { generateTicket, notifyFill } from "../actions/game";
import Heading from "./Heading";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
// import {Button} from 'react-bootstrap'
import PropTypes from "prop-types";
import SelectItem from "react-select-item";

const GenerateTicketForm = ({ game, generateTicket, notifyFill }) => {

    const players = game ?  game.players : ["Loading.."];
  const [formData, setFormData] = useState({
    playername: "",
    noOfTickets: 0,
    gameID: game ? game.gameID : "",
    playerid: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { playername, noOfTickets, playerid } = formData;

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


  // const handleChange = (e) => {
  //   setFormData({...formData, [e.target.name]: e.target.selectedIndex.name, ["playerid"]: e.target.selectedIndex.name})
  //   alert(" " + playername + " " +playerid)
  // }
  return (
    <div className="content-post">
      <Fragment>
        <Heading text="Generate Ticket" />
        {/* <span class="text-span">Join Game Form:-</span> */}
        <div className="container">
          <form onSubmit={(e) => onSubmit(e)}>
            <div class="form-input-group">
              {/* <label class="omrs-input-underlined">
                <input
                  type="select"
                  className="i"
                  placeholder="Name"
                  type="text"
                  id="playername"
                  name="playername"
                  value={playername}
                  disabled
                  onChange={(e) => onChange(e)}
                ></input>
              </label> */}
              <select value={playername} name="playername" onChange={(e) => onChange(e)}>
              {/* <option value={"Select the player.."}>Select The Player</option> */}
                {players.map((player) => {              
                  return (
                  <option value={player.name}>{player.name}</option>
                  )
                }
                )}
              </select>
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
