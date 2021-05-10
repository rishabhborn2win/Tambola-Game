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
    <div>
      {/* <Heading text="Ticket List!" /> */}
      <div className="ticket-list">
        {tickets
          ? tickets.tickets !== undefined
            ? tickets.tickets.map((serial, index) => {
                return (
                  <div class="ticket">
                    <p>
                      Name: {tickets.name} ({`${tickets.ticketId}-${index + 1}`}
                      )
                    </p>
                    <Ticket
                      ticket={serial}
                      ticketId={`${tickets.ticketId}-${index + 1}`}
                      numCalled={numCalled}
                    />
                    <DividendsVerify
                      ticket={serial}
                      numCalled={numCalled}
                      playername={tickets.name}
                      gameid={game._id}
                    />
                  </div>
                );
              })
            : "You haven't Generated The Ticket Still!"
          : "Please Refresh the Page..."}
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
