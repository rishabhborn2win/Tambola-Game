import { Link } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";
import { Button } from "react-bootstrap";
import { loadGame } from "../actions/game";

import "./style.css";
import Heading from "./Heading";
import { Fragment } from "react";
import Host from "./Host";
import Player from "./Player";

function Home({ game }) {
  useEffect(() => {
    loadGame();
  });

  // loadGame();

  var numCalled = [];
  if (game.game) {
    game.game.numbers.map((num) => {
      if (num.called === true) {
        numCalled.push(num.number);
        // console.log(numCalled)
      }
      return 0;
    });
  }

  if (localStorage.gameid || localStorage.playerid) {
    loadGame();
    console.log("I am in!");
    var typeOfPlayer;
    if (localStorage.gameid) typeOfPlayer = "Host";
    else if (localStorage.username)
      typeOfPlayer = `Player : ${localStorage.username}`;
    return (
      <Fragment>
        <Heading text={`Game Dashboard (${typeOfPlayer})`} />

        {game.loading ? (
          <Spinner></Spinner>
        ) : (
          <div className="container">
            <Link to="/play">
              <button className="btn btn-lg">Resume Game</button>
              <br></br>
              <br></br>
            </Link>
            <div className="host-player">
              <Host game={game.game} total={numCalled.length}></Host>
              {game.game ? (
                localStorage.gameid === game.game._id ? (
                  <Player game={game.game ? game.game : {}} />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Heading text="Welcome to Tambola," />
      <span class="text-span">Select Option:-</span>
      <div class="container">
        <Link to="/join">
          <Button variant="success" className="button-lg">
            Join Game
          </Button>
        </Link>{" "}
        <Link to="/create">
          <Button variant="success" className="button-lg">
            Create A Game
          </Button>
        </Link>
      </div>
    </Fragment>
  );
}
Home.propTypes = {
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Home);
