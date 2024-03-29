import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Heading from "../Heading";


export const TicketScan = () => {
  const [data, setData] = React.useState(localStorage.getItem("data"));
  console.log(data);
  var string = localStorage.data ? localStorage.data : "";
  var tickets =[];

  //Case for tambola book
  if(string[1]==="." || string[2]==="." || string[3] === "."){
    var ticketDetailsTambolaBook= string.split('.,.');
    var playerDetails = ticketDetailsTambolaBook[3].split(',,,');
    for (var r = 1; r < ticketDetailsTambolaBook.length - 1; r++) {
        var ticket1TambolaBook = ticketDetailsTambolaBook[r].split("");
        var numbersTambolaBook = [];
        for (var a = 0, b = 0; a < 45; a = a + 3, b++) {
          numbersTambolaBook[b] = ticket1TambolaBook[a + 1] + "" + ticket1TambolaBook[a + 2];
        }
        var ticketTambolaBook = [];
        for (var skipTambolaBook = 0, c = 0, valueTambolaBook = -1; c < 15; skipTambolaBook = skipTambolaBook + 3, c++) {
          var d = ticket1TambolaBook[skipTambolaBook];
          while (d > 0) {
            valueTambolaBook++;
            ticketTambolaBook[valueTambolaBook] = 0;
            d--;
          }
          valueTambolaBook++;
          ticketTambolaBook[valueTambolaBook] = numbersTambolaBook[c];
        }
        tickets.push(ticketTambolaBook);
      }


  }else {
  //if the qr is of tambola host
  var ticketDetails = string.split("@@");
  for (var z = 5; z < ticketDetails.length - 1; z++) {
    var ticket1 = ticketDetails[z].split("");
    var numbers = [];
    for (var i = 0, j = 0; i < 45; i = i + 3, j++) {
      numbers[j] = ticket1[i + 1] + "" + ticket1[i + 2];
    }
    var ticket = [];
    for (var skip = 0, k = 0, value = -1; k < 15; skip = skip + 3, k++) {
      var t = ticket1[skip];
      while (t > 0) {
        value++;
        ticket[value] = 0;
        t--;
      }
      value++;
      ticket[value] = numbers[k];
    }
    tickets.push(ticket);
  }
}



  //function to stop scanning
  const [hide, setHide] = React.useState(localStorage.data ? true : false);

  //indexing
  var firstRow = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var secondRow = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  var thirdRow = [18, 19, 20, 21, 22, 23, 24, 25, 26];

  //function to color the cell on click
  const colorCell = (index, num) => {
    var classOfCell = `${num}cell${index}`;
    if (document.getElementById(classOfCell).style.backgroundColor === "pink") {
      let res = window.confirm("Are You sure?");
      if (res) {
        return (document.getElementById(classOfCell).style.backgroundColor =
            "#fff");
      }
    }
    if (num !== 0) {
      document.getElementById(classOfCell).style.backgroundColor = "pink";
    }
  };

  //resets function
  const reset = async () => {
    let res = await window.confirm("Are You sure this can't be undone!");
    if (res) {
      localStorage.removeItem("data");
      setHide(false);
    }
  };

  return (
    <div>
      <Heading text="Scan Tambola Host Tickets" />
      <div className="container">
        <hr />
        <div>
          {hide ? (
            <button className="btn-danger btn" onClick={() => reset()}>
              Reset
            </button>
          ) : (
            ""
          )}{" "}
          {hide ? (
            <button className="btn-success btn " onClick={() => setHide(false)}>
              Scan Other Tickets
            </button>
          ) : (
            <BarcodeScannerComponent
              width={500}
              height={500}
              onUpdate={(err, result) => {
                if (result) {
                  localStorage.setItem("data", result.text);
                  setData(result.text);
                  setHide(true);
                } else setData("Not Found");
              }}
            />
          )}
        </div>
        <div className="container-ticket">
          {tickets
            ? tickets.map((ticket) => {
                return (
                  <div className="ticket">
                    <span>Tambola Numbers</span>
                    {playerDetails ? (<p>
                      {playerDetails[5]} - {playerDetails[6]} -{" "}
                      {ticketDetailsTambolaBook[0]++}
                    </p>) :(<p>
                      ({ticketDetails[2]} - {ticketDetails[3]} -{" "}
                      {ticketDetails[4]++})
                    </p>)}
                    <table className="tambola-ticket">
                      <tr>
                        {firstRow.map((address) => {
                          return (
                            <td
                              id={`${ticket[address]}cell${address}`}
                              onClick={() =>
                                colorCell(address, ticket[address])
                              }
                            >
                              {ticket[address] !== 0 ? ticket[address] : ""}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        {secondRow.map((address) => {
                          return (
                            <td
                              id={`${ticket[address]}cell${address}`}
                              onClick={() =>
                                colorCell(address, ticket[address])
                              }
                            >
                              {ticket[address] !== 0 ? ticket[address] : ""}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        {thirdRow.map((address) => {
                          return (
                            <td
                              id={`${ticket[address]}cell${address}`}
                              onClick={() =>
                                colorCell(address, ticket[address])
                              }
                            >
                              {ticket[address] !== 0 ? ticket[address] : ""}
                            </td>
                          );
                        })}
                      </tr>
                    </table>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};
