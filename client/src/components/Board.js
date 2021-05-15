import React from "react";
import { useState } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment, useEffect } from "react";
import {
  dropGame,
  loadGame,
  nextNumber,
  leaveGame,
  loadTicket,
  refreshGame,
} from "../actions/game";
import Moment from "react-moment";
import Player from "./Player";
import Heading from "./Heading";
import Host from "./Host";
import { Link } from "react-router-dom";
import GenerateTicketForm from "./GenerateTicketForm";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import TicketList from "./TicketList";
import NumberHistory from "./NumberHistory";
import { transform } from "./transformFunction";
import ReactTooltip from "react-tooltip";
import { Leadarboard } from "./Leadarboard";
// import Spinner from "./layout/Spinner";

function Board({
  game: { game, loading },
  dropGame,
  nextNumber,
  loadGame,
  leaveGame,
  numberCalled,
  loadTicket,
  refreshGame,
}) {
  // making it live as it will call the data from the database every 2.5s
  useEffect(() => {
    setInterval(function () {
      refreshGame();
    }, 5000);
    // loadGame();
  }, [refreshGame]);

  //fucntion for deleting the game
  const deleteGame = () => {
    if (game.players.length === 0) dropGame(localStorage.gameid);
    else alert("Let all the player leave first!");
  };

  //check which numbers are called and marking them as blue
  useEffect(() => {
    game.numbers.map((num, index) => {
      if (num.called === true) {
        document.getElementById(num.number).style.background = "blue";
      }
      return 0;
    });
  }, [game]);

  useEffect(() => {
    var ticketId = "";
    game.players.map((player) => {
      if (player.name === localStorage.username) {
        return (ticketId = player.tickets);
      } else return 0;
    });
    localStorage.setItem("ticketId", ticketId);
  }, [game]);

  //leave the game for the player who has joined
  const leave = (e) => {
    e.preventDefault();
    leaveGame(
      localStorage.getItem("playerid"),
      localStorage.getItem("username")
    );
  };

  //everytime saving all the called numbers from the database when it is updated
  var numCalled = [];
  game.numbers.map((num) => {
    if (num.called === true) {
      numCalled.push(num.number);
      // console.log(numCalled)
    }
    return 0;
  });

  //calling necxt num should disable the necxt num button so that a user can't call it uneccesarily
  const nextNum = () => {
    if (game.players.length > 0) {
      nextNumber(localStorage.gameid);
      document.getElementById("nxt").disabled = true;
      document.getElementById("nxt").style.opacity = 0.5;
      setTimeout(function () {
        document.getElementById("nxt").disabled = false;
        document.getElementById("nxt").style.opacity = 1;
      }, 3000);
    } else {
      setAutomaticPlay(false);
      alert("Let Players Joined the Game!");
    }
  };

  //getting the index value
  var i;
  var numbersArray = game.numbers;

  for (i = 0; i < 90; i++) {
    if (numbersArray[i].called === false) break;
  }

  //adding feature of automatic calling numbers if the host pressed play button and if paused
  //then the automatic calling should be unfollowed

  const [automaticPlay, setAutomaticPlay] = useState(false);
  // if(automaticPlay){
  //   setInterval(function () {
  //     nextNum();
  //   }, 5000)
  // }

  //coloring the current number to be red
  useEffect(() => {
    if (numCalled.length !== undefined) {
      if (numCalled.length !== 0) {
        document.getElementById(
          numCalled[numCalled.length - 1]
        ).style.background = "red";
      }
    }
  });

  //declaring the type of player
  var typeOfPlayer;
  if (localStorage.gameid) typeOfPlayer = "Host";
  else if (localStorage.username)
    typeOfPlayer = `Player : ${localStorage.username}`;

  //transform the number using emoji
  var numString = transform(numCalled[numCalled.length - 1] || 0, game.gameID);

  //open numbers history
  const [openNumbers, setOpenNumbers] = useState(false);

  //opens leadarboard
  const [openLeadarboard, setOpenLeadarboard] = useState(false);

  //modal function
  const [open, setOpen] = React.useState(false);
  const onCloseModal = () => {
    setOpen(false);
  };
  const onOpenModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  //if the dashboard is for player finding out the player information
  var playerDetails;
  if (localStorage.username) {
    game.players.map((player) => {
      if (player.name === localStorage.username)
        return (playerDetails = player);
      else {
        alert("Unauthorize Access!");
        return null;
      }
    });
  }

  //alert all the player the winner of the game and to leave the game
  if (
    (numCalled.length === 90 ||
      (game.dividends["firstLine"].winner &&
        game.dividends["secondLine"].winner &&
        game.dividends["thirdLine"].winner &&
        game.dividends["earlyFive"].winner &&
        game.dividends["fourCorner"].winner &&
        game.dividends["middleNumber"].winner &&
        game.dividends["house"].winner)) &&
    localStorage.username
  ) {
    window.location.href = "/gameover";
  }

  //returning JSX
  return (
    <Fragment>
      <ReactTooltip />
      <Heading text={`Game Dashboard (${typeOfPlayer})`} />
      {localStorage.gameid ? (
        <Modal open={open} onClose={onCloseModal} center>
          <GenerateTicketForm onCloseModal={onCloseModal} game={game} />
        </Modal>
      ) : (
        ""
      )}
      <div className="top-row">
        <div className="gameid">
          <span>Game ID: </span>
          <span className="gameid-value">{game.gameID} </span>
        </div>
        {playerDetails ? (
          <div className="gameid">
            <span>Score: </span>
            <span>{playerDetails.score}</span>
          </div>
        ) : (
          ""
        )}

        {/* <div>
          <a
            href={`whatsapp://send?text=This is a Invite to Tambola Numbers!🙏🏻 \n GameID: ${game.gameID}`}
            data-action="share/whatsapp/share"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <WhatsappIcon size={32} round={true} />
          </a>
        </div> */}

        {localStorage.gameid ? (
          <div className="trash">
            <a href="#top" onClick={() => deleteGame()} class="ow">
              <i class="fa fa-trash-o"></i>
            </a>
          </div>
        ) : (
          <div className="trash">
            <a href="#top" class="" onClick={(e) => leave(e)}>
              &#9166;
            </a>
          </div>
        )}
      </div>

      <div className="container">
        <div className="second-row">
          <div class="absolute-loading">
            {/* {loading ? <Spinner></Spinner> : ""} */}
          </div>
          <p
            data-tip="Click Here, For History!!"
            onClick={() => setOpenNumbers(!openNumbers)}
          >
            <span className="prev">{numCalled[numCalled.length - 4] || 0}</span>
            <span className="prev">{numCalled[numCalled.length - 3] || 0}</span>
            <span className="prev">
              {numCalled[numCalled.length - 2] || 0}{" "}
            </span>
            <span className="current">
              {numCalled[numCalled.length - 1] || 0}
            </span>
            {openNumbers ? <NumberHistory numCalled={numCalled} /> : ""}
          </p>
        </div>
        {/* <div>
            <span className="refresh-container" ><i class="fa fa-refresh btn-lg" onClick={() => loadGame() }></i></span>
        </div> */}
        <br />
        {localStorage.playerid ? (
          <div>
            <TicketList
              tickets={game.tickets}
              game={game}
              numCalled={numCalled}
            />{" "}
          </div>
        ) : (
          ""
        )}
        {localStorage.gameid ? (
          <div>
            <Link to="#" className="btn-lg" onClick={onOpenModal}>
              Generate Tickets
            </Link>
            {automaticPlay ? (
              <a
                href="#top"
                class=""
                onClick={(e) => {
                  setAutomaticPlay(!automaticPlay);
                  alert("Feature is under maintainence!!");
                }}
              >
                {/* Pause button unicode */}
                &#9208;
              </a>
            ) : (
              <a
                href="#top"
                class=""
                onClick={(e) => {
                  setAutomaticPlay(!automaticPlay);
                  alert("Feature is under maintainence!!");
                }}
              >
                {/* play button unicode */}
                &#9654;
              </a>
            )}
          </div>
        ) : (
          ""
        )}
        <br />
        <div onClick={() => setOpenLeadarboard(!openLeadarboard)}>
          <a href="#top" className="btn-lg">
            Leadarboard
          </a>
        </div>
        {openLeadarboard ? (
          <Leadarboard game={game} setOpenLeadarboard={setOpenLeadarboard} />
        ) : (
          ""
        )}
        <br />
        <table id="table">
          <tr>
            <td>
              <button id="1" class="number-button" onclick="select(this.id)">
                1
              </button>
            </td>
            <td>
              <button id="2" class="number-button" onclick="select(this.id)">
                2
              </button>
            </td>
            <td>
              <button id="3" class="number-button" onclick="select(this.id)">
                3
              </button>
            </td>
            <td>
              <button id="4" class="number-button" onclick="select(this.id)">
                4
              </button>
            </td>
            <td>
              <button id="5" class="number-button" onclick="select(this.id)">
                5
              </button>
            </td>
            <td>
              <button id="6" class="number-button" onclick="select(this.id)">
                6
              </button>
            </td>
            <td>
              <button id="7" class="number-button" onclick="select(this.id)">
                7
              </button>
            </td>
            <td>
              <button id="8" class="number-button" onclick="select(this.id)">
                8
              </button>
            </td>
            <td>
              <button id="9" class="number-button" onclick="select(this.id)">
                9
              </button>
            </td>
            <td>
              <button id="10" class="number-button" onclick="select(this.id)">
                10
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="11" class="number-button" onclick="select(this.id)">
                11
              </button>
            </td>
            <td>
              <button id="12" class="number-button" onclick="select(this.id)">
                12
              </button>
            </td>
            <td>
              <button id="13" class="number-button" onclick="select(this.id)">
                13
              </button>
            </td>
            <td>
              <button id="14" class="number-button" onclick="select(this.id)">
                14
              </button>
            </td>
            <td>
              <button id="15" class="number-button" onclick="select(this.id)">
                15
              </button>
            </td>
            <td>
              <button id="16" class="number-button" onclick="select(this.id)">
                16
              </button>
            </td>
            <td>
              <button id="17" class="number-button" onclick="select(this.id)">
                17
              </button>
            </td>
            <td>
              <button id="18" class="number-button" onclick="select(this.id)">
                18
              </button>
            </td>
            <td>
              <button id="19" class="number-button" onclick="select(this.id)">
                19
              </button>
            </td>
            <td>
              <button id="20" class="number-button" onclick="select(this.id)">
                20
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="21" class="number-button" onclick="select(this.id)">
                21
              </button>
            </td>
            <td>
              <button id="22" class="number-button" onclick="select(this.id)">
                22
              </button>
            </td>
            <td>
              <button id="23" class="number-button" onclick="select(this.id)">
                23
              </button>
            </td>
            <td>
              <button id="24" class="number-button" onclick="select(this.id)">
                24
              </button>
            </td>
            <td>
              <button id="25" class="number-button" onclick="select(this.id)">
                25
              </button>
            </td>
            <td>
              <button id="26" class="number-button" onclick="select(this.id)">
                26
              </button>
            </td>
            <td>
              <button id="27" class="number-button" onclick="select(this.id)">
                27
              </button>
            </td>
            <td>
              <button id="28" class="number-button" onclick="select(this.id)">
                28
              </button>
            </td>
            <td>
              <button id="29" class="number-button" onclick="select(this.id)">
                29
              </button>
            </td>
            <td>
              <button id="30" class="number-button" onclick="select(this.id)">
                30
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="31" class="number-button" onclick="select(this.id)">
                31
              </button>
            </td>
            <td>
              <button id="32" class="number-button" onclick="select(this.id)">
                32
              </button>
            </td>
            <td>
              <button id="33" class="number-button" onclick="select(this.id)">
                33
              </button>
            </td>
            <td>
              <button id="34" class="number-button" onclick="select(this.id)">
                34
              </button>
            </td>
            <td>
              <button id="35" class="number-button" onclick="select(this.id)">
                35
              </button>
            </td>
            <td>
              <button id="36" class="number-button" onclick="select(this.id)">
                36
              </button>
            </td>
            <td>
              <button id="37" class="number-button" onclick="select(this.id)">
                37
              </button>
            </td>
            <td>
              <button id="38" class="number-button" onclick="select(this.id)">
                38
              </button>
            </td>
            <td>
              <button id="39" class="number-button" onclick="select(this.id)">
                39
              </button>
            </td>
            <td>
              <button id="40" class="number-button" onclick="select(this.id)">
                40
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="41" class="number-button" onclick="select(this.id)">
                41
              </button>
            </td>
            <td>
              <button id="42" class="number-button" onclick="select(this.id)">
                42
              </button>
            </td>
            <td>
              <button id="43" class="number-button" onclick="select(this.id)">
                43
              </button>
            </td>
            <td>
              <button id="44" class="number-button" onclick="select(this.id)">
                44
              </button>
            </td>
            <td>
              <button id="45" class="number-button" onclick="select(this.id)">
                45
              </button>
            </td>
            <td>
              <button id="46" class="number-button" onclick="select(this.id)">
                46
              </button>
            </td>
            <td>
              <button id="47" class="number-button" onclick="select(this.id)">
                47
              </button>
            </td>
            <td>
              <button id="48" class="number-button" onclick="select(this.id)">
                48
              </button>
            </td>
            <td>
              <button id="49" class="number-button" onclick="select(this.id)">
                49
              </button>
            </td>
            <td>
              <button id="50" class="number-button" onclick="select(this.id)">
                50
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="51" class="number-button" onclick="select(this.id)">
                51
              </button>
            </td>
            <td>
              <button id="52" class="number-button" onclick="select(this.id)">
                52
              </button>
            </td>
            <td>
              <button id="53" class="number-button" onclick="select(this.id)">
                53
              </button>
            </td>
            <td>
              <button id="54" class="number-button" onclick="select(this.id)">
                54
              </button>
            </td>
            <td>
              <button id="55" class="number-button" onclick="select(this.id)">
                55
              </button>
            </td>
            <td>
              <button id="56" class="number-button" onclick="select(this.id)">
                56
              </button>
            </td>
            <td>
              <button id="57" class="number-button" onclick="select(this.id)">
                57
              </button>
            </td>
            <td>
              <button id="58" class="number-button" onclick="select(this.id)">
                58
              </button>
            </td>
            <td>
              <button id="59" class="number-button" onclick="select(this.id)">
                59
              </button>
            </td>
            <td>
              <button id="60" class="number-button" onclick="select(this.id)">
                60
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="61" class="number-button" onclick="select(this.id)">
                61
              </button>
            </td>
            <td>
              <button id="62" class="number-button" onclick="select(this.id)">
                62
              </button>
            </td>
            <td>
              <button id="63" class="number-button" onclick="select(this.id)">
                63
              </button>
            </td>
            <td>
              <button id="64" class="number-button" onclick="select(this.id)">
                64
              </button>
            </td>
            <td>
              <button id="65" class="number-button" onclick="select(this.id)">
                65
              </button>
            </td>
            <td>
              <button id="66" class="number-button" onclick="select(this.id)">
                66
              </button>
            </td>
            <td>
              <button id="67" class="number-button" onclick="select(this.id)">
                67
              </button>
            </td>
            <td>
              <button id="68" class="number-button" onclick="select(this.id)">
                68
              </button>
            </td>
            <td>
              <button id="69" class="number-button" onclick="select(this.id)">
                69
              </button>
            </td>
            <td>
              <button id="70" class="number-button" onclick="select(this.id)">
                70
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="71" class="number-button" onclick="select(this.id)">
                71
              </button>
            </td>
            <td>
              <button id="72" class="number-button" onclick="select(this.id)">
                72
              </button>
            </td>
            <td>
              <button id="73" class="number-button" onclick="select(this.id)">
                73
              </button>
            </td>
            <td>
              <button id="74" class="number-button" onclick="select(this.id)">
                74
              </button>
            </td>
            <td>
              <button id="75" class="number-button" onclick="select(this.id)">
                75
              </button>
            </td>
            <td>
              <button id="76" class="number-button" onclick="select(this.id)">
                76
              </button>
            </td>
            <td>
              <button id="77" class="number-button" onclick="select(this.id)">
                77
              </button>
            </td>
            <td>
              <button id="78" class="number-button" onclick="select(this.id)">
                78
              </button>
            </td>
            <td>
              <button id="79" class="number-button" onclick="select(this.id)">
                79
              </button>
            </td>
            <td>
              <button id="80" class="number-button" onclick="select(this.id)">
                80
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="81" class="number-button" onclick="select(this.id)">
                81
              </button>
            </td>
            <td>
              <button id="82" class="number-button" onclick="select(this.id)">
                82
              </button>
            </td>
            <td>
              <button id="83" class="number-button" onclick="select(this.id)">
                83
              </button>
            </td>
            <td>
              <button id="84" class="number-button" onclick="select(this.id)">
                84
              </button>
            </td>
            <td>
              <button id="85" class="number-button" onclick="select(this.id)">
                85
              </button>
            </td>
            <td>
              <button id="86" class="number-button" onclick="select(this.id)">
                86
              </button>
            </td>
            <td>
              <button id="87" class="number-button" onclick="select(this.id)">
                87
              </button>
            </td>
            <td>
              <button id="88" class="number-button" onclick="select(this.id)">
                88
              </button>
            </td>
            <td>
              <button id="89" class="number-button" onclick="select(this.id)">
                89
              </button>
            </td>
            <td>
              <button id="90" class="number-button" onclick="select(this.id)">
                90
              </button>
            </td>
          </tr>
        </table>
        <div class="display">
          <p>
            <span className="datetime">
              {i !== 0 ? (
                <span>
                  Last Called:{" "}
                  <b>
                    <Moment
                      date={game.numbers[i - 1].calledTime}
                      format="D MMM YYYY"
                    ></Moment>{" "}
                    <Moment
                      date={game.numbers[i - 1].calledTime}
                      format="hh:mm:ss"
                    ></Moment>
                  </b>
                </span>
              ) : (
                <Fragment>Start The Game</Fragment>
              )}
            </span>
          </p>
        </div>
        <br />
        <div className="container-whatsapp">
          {game._id === localStorage.gameid ? (
            <Fragment>
              {numberCalled !== undefined ? (
                !(
                  numCalled.length === 90 ||
                  (game.dividends["firstLine"].winner &&
                    game.dividends["secondLine"].winner &&
                    game.dividends["thirdLine"].winner &&
                    game.dividends["earlyFive"].winner &&
                    game.dividends["fourCorner"].winner &&
                    game.dividends["middleNumber"].winner &&
                    game.dividends["house"].winner)
                ) ? (
                  <button onClick={() => nextNum()} class="btn-lg" id="nxt">
                    Next Number (Wait 3s)
                  </button>
                ) : (
                  <p>Game FINISHED !!</p>
                )
              ) : (
                ""
              )}

              <br />
              <br />
            </Fragment>
          ) : (
            <Fragment></Fragment>
          )}
          {/* <div>
            <span className="refresh-container" ><i class="fa fa-refresh btn-lg" onClick={() => loadGame() }></i></span>
        </div> */}
          <div className="whatsapp-container">
            <a
              href={`whatsapp://send?text=${numString}`}
              data-action="share/whatsapp/share"
              target="_blank"
              rel="noreferrer"
              className="btn-lg"
            >
              {" "}
              Share
            </a>
          </div>
        </div>
        <br />
        <div className="host-player">
          <Host game={game} total={numCalled.length} />
          {localStorage.gameid === game._id ? <Player game={game} /> : ""}
        </div>
      </div>
    </Fragment>
  );
}

Board.propTypes = {
  game: PropTypes.object.isRequired,
  dropGame: PropTypes.func.isRequired,
  nextNumber: PropTypes.func.isRequired,
  numberCalled: PropTypes.array.isRequired,
  loadTicket: PropTypes.func.isRequired,
  refreshGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
  numberCalled: state.game.numCalled,
});

export default connect(mapStateToProps, {
  dropGame,
  nextNumber,
  loadGame,
  leaveGame,
  loadTicket,
  refreshGame,
})(Board);
