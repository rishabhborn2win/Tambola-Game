import React from "react";

const Ticket = () => {
  let ticket = [
    [8, 0, 21, 0, 48, 0, 0, 75, 89],
    [0, 11, 0, 32, 49, 53, 0, 78, 0],
    [0, 16, 28, 37, 0, 60, 67, 0, 0],
  ];
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
