import React, { useEffect } from "react";
import Ticket from "./Ticket";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadTicket } from "../actions/game";
import DividendsVerify from "./DividendsVerify";
// import Heading from "./Heading";

const TicketList = ({ numCalled, tickets, loadTicket, game }) => {
  useEffect(() => {
    loadTicket();
  }, [loadTicket]);

  return (
    <div className="container">
      {/* <Heading text="Ticket List!" /> */}
      <div className="ticket-list">
        {tickets
          ? tickets.tickets !== undefined && tickets.tickets.length>0
            ? tickets.tickets.map((serial, index) => {
                return (
                  <div className="container">
                  <div class="ticket">
                    <span>Tambola Numbers</span>
                    <p>
                      {tickets.name} ({`${tickets.ticketId}-${index + 1}`}
                      )
                    </p>
                    <Ticket
                      ticket={serial}
                      ticketId={`${tickets.tickestId}-${index + 1}`}
                      numCalled={numCalled}
                    />
                  </div>
                  <div>
                  <DividendsVerify
                  ticket={serial}
                  numCalled={numCalled}
                  playername={tickets.name}
                  gameid={game._id}
                />
                </div>
                </div>
                );
              })
            : <button onClick={loadTicket}>Reload To get Your Ticket</button>
          :<button onClick={loadTicket}>Reload To Get Your Ticket</button>}
      </div>
    </div>
  );
};

TicketList.prototype = {
  tickets: PropTypes.object.isRequired,
  loadTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game.game,
  tickets: state.game.tickets,
});
export default connect(mapStateToProps, { loadTicket })(TicketList);
