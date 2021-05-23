import React, { Fragment, useState } from "react";
import { generateTicket, notifyFill } from "../actions/game";
import Heading from "./Heading";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import {Button} from 'react-bootstrap'
import PropTypes from "prop-types";

const GenerateTicketForm = ({
  onCloseModal,
  game,
  generateTicket,
  notifyFill,
}) => {
  const players = game ? game.players : ["Loading.."];
  const [formData, setFormData] = useState({
    playername: {},
    noOfTickets: 1,
    gameID: game ? game.gameID : "",
    playerid: "",
  });
  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const { playername, noOfTickets, playerid } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (playername.length < 6) {
      notifyFill("Player Name Should have more then 6 Char");
    } else if (noOfTickets < 1 || noOfTickets > 6) {
      notifyFill("No Of tickets can not be more then 6");
    } else if (playername === "not allowed") {
      notifyFill("Please select the player...");
    } else {
      generateTicket(formData);
      onCloseModal(false);
    }
  };

  const handleChange = (e) => {
    let data = {
      ...formData,
      playername: e.target.value,
      playerid: e.target.options[e.target.selectedIndex].title,
    };
    console.log(data);
    setFormData(data);
  };
  const decrement = () => {
    if (noOfTickets > 0)
      setFormData({ ...formData, noOfTickets: noOfTickets - 1 });
  };

  const increment = () => {
    if (noOfTickets < 6)
      setFormData({ ...formData, noOfTickets: noOfTickets + 1 });
  };
  return (
    <div className="content-post">
      <Fragment>
        <Heading text="Generate Ticket" />
        {/* <span class="text-span">Join Game Form:-</span> */}
        <div className="container">
          <form onSubmit={(e) => onSubmit(e)}>
            <div class="select-list">
              <select
                value={playername}
                className="custom-select"
                id={playerid}
                onChange={(e) => handleChange(e)}
              >
                <option value={"not allowed"} title={""}>
                  *Select Player!
                </option>
                {players.map((player) => {
                  if (!player.tickets) {
                    return (
                      <option value={player.name} title={player._id}>
                        {player.name}
                      </option>
                    );
                  } else return 0;
                })}
              </select>
            </div>
            <div class="number-selector">
              <span onClick={decrement}>-</span>
              <span>{noOfTickets}</span>
              <span onClick={increment}>+</span>
              {/* onClick={setFormData({...formData, noOfTickets: noOfTickets+1})} */}
              {/* <label class="omrs-input-underlined">
                <input
                  className="input"
                  placeholder="No. Of Tickets"
                  type="text"
                  id="noOfTickets"
                  name="noOfTickets"
                  onChange={(e) => onChange(e)}
                ></input>
              </label> */}
            </div>
            <input
              type="submit"
              value="Generate"
              className="btn btn-primary btn-m-20"
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
