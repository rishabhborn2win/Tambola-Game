import "./style.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment, useEffect } from "react";
import { dropGame, loadGame, nextNumber, leaveGame } from "../actions/game";
import Moment from "react-moment";
import Player from "./Player";

function Board({ game: { game }, dropGame, nextNumber, loadGame, leaveGame }) {
  useEffect(() => {
    setInterval(function() {
      loadGame();
    }, 2500);
  },[loadGame]);

  const deleteGame = () => {
    dropGame(localStorage.gameid);
  };

  const leave = (e) => {
    e.preventDefault();
    leaveGame()
  }

  const nextNum = () => {
    nextNumber(localStorage.gameid);

    document.getElementById("nxt").disabled = true;
    document.getElementById("nxt").style.opacity = 0.5;
    setTimeout(function () {
      document.getElementById("nxt").disabled = false;
      document.getElementById("nxt").style.opacity = 1;
    }, 3000);
  };

  var numCalled = [];
  game.numbers.map((num) => {
    if (num.called === true) {
      numCalled.push(num.number);
    }
  });
  var i;
  var numbersArray = game.numbers;

  for (i = 0; i < 90; i++) {
    if (numbersArray[i].called === false) break;
  }

  return (
    <div className="container">
      <h2>Game/host Name: </h2> {game.host}
      <h2>Game ID:</h2>
      <span>{game.gameID}</span>
      <br />
      {localStorage.gameid ? (
        <Fragment>You are Host</Fragment>
      ) : (
        <Fragment></Fragment>
      )}
      {localStorage.playerid ? (
        <Fragment>You are joined as player</Fragment>
      ) : (
        <Fragment></Fragment>
      )}
      <table>
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
          Date/Time:{" "}
          <span id="datetime">
            <Moment>
              {i != 0 ? (
                game.numbers[i - 1].calledTime
              ) : (
                <Fragment>Start The Game</Fragment>
              )}
            </Moment>
          </span>
        </p>
        <label id="current">{numCalled[numCalled.length - 1] || 0}</label>
        <label for="">&#8592;</label>
        <label id="previous">{numCalled[numCalled.length - 2] || 0}</label>
        <label for="">&#8592;</label>
        <label id="previous1">{numCalled[numCalled.length - 3] || 0}</label>
        <label for="">&#8592;</label>
        <label id="previous2">{numCalled[numCalled.length - 4] || 0}</label>
        <label for="">&#8592;</label>
        <label id="previous3">{numCalled[numCalled.length - 5] || 0}</label>
        <label>: Total: </label>
        <label id="total">{numCalled.length}</label>
      </div>
      <br />
      {game._id === localStorage.gameid ? (
        <Fragment>
          <button onClick={() => nextNum()} class="show" id="nxt">
            Next Number (Wait for 3s)
          </button>
          <br />
          <br />
          <button onClick={() => deleteGame()} class="show">
            Delete
          </button>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
      <br />
      {localStorage.playerid ? (
        <Fragment>
          <buton class="show" onClick={(e) => leave(e)}>
            Leave The Game
          </buton>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
      <h4>
        Made By:- <b>Rishabh Mishra</b>
        <br />
        Contact:{" "}
        <a href="mailto: rishabhborn2win@gmail.com">
          rishabhborn2win@gmail.com
        </a>
      </h4>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h4>Players Name:</h4>
      <Player />
    </div>
  );
}

Board.propTypes = {
  game: PropTypes.object.isRequired,
  dropGame: PropTypes.func.isRequired,
  nextNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, {
  dropGame,
  nextNumber,
  loadGame,
  leaveGame,
})(Board);
