import React from "react";

const Ticket = ({ ticket }) => {
  return (
    <div>
      <table>
        {ticket.map((row) => {
          return (
            <tr>
              {row.map((num) => {
                return <td>{num !== 0 ? num : ""}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default Ticket;
