import React, {useEffect} from "react";
import Ticket from "./Ticket";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {loadTicket}  from '../actions/game'
import Heading from "./Heading";


const TicketList = ({ tickets, loadTicket }) => {
  useEffect(() => {
    loadTicket()
  }, [])
    
  return (
    <div>
        <Heading text="Ticket List!" />
          <div>
            {tickets ? (tickets.tickets !== undefined ? (tickets.tickets.map((serial, index) => {
              return (
                <div>
                  <p>Name: {tickets.name}</p>
                  <p>Ticket ID: {`${tickets.ticketId}-${index+1}`}</p>
                  <Ticket ticket={serial} />
                </div>
              );
            })):("You haven't Generated The Ticket Still!")) : ("Loading...")}
          </div>
    </div>
  );
};

TicketList.prototype = {
  tickets: PropTypes.object.isRequired,
  loadTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tickets: state.game.tickets,
});
export default connect(mapStateToProps, {loadTicket})(TicketList);
