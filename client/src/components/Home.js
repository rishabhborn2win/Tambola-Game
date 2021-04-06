import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";

function Home({ game }) {
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
    var typeOfPlayer;
    if (localStorage.gameid) typeOfPlayer = "Host";
    else if (localStorage.username)
      typeOfPlayer = `Player : ${localStorage.username}`;
    return (
      <button>
        <Link to="/play">Resume Game</Link>
      </button>
    );
  }

  if (game.loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <button>
        <Link to="/join">Join Game</Link>
      </button>
      <button>
        <Link to="/create">Create A Game</Link>
      </button>
    </div>
  );
}
Home.propTypes = {
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(Home);
