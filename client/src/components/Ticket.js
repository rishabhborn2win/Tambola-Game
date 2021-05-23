import React from "react";
// import { DividendsVerify } from "./DividendsVerify";

const Ticket = ({ numCalled, ticket, ticketId }) => {
  const colorCell = (num, index) => {
    var classOfCell = `${ticketId}${num}cell${index}`;
    if (document.getElementById(classOfCell).style.backgroundColor === "pink") {
      let res = window.confirm("Are You sure?");
      if (res) {
        return (document.getElementById(classOfCell).style.backgroundColor =
          "white");
      }
    }
    if (num !== 0) {
      return (document.getElementById(classOfCell).style.backgroundColor =
        "pink");
    }
  };

  return (
    <div>
      <table class="tambola-ticket">
        {ticket.map((row) => {
          return (
            <tr>
              {row.map((num, index) => {
                return (
                  <td
                    id={`${ticketId}${num}cell${index}`}
                    onClick={() => colorCell(num, index)}
                  >
                    {num !== 0 ? num : ""}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default Ticket;
