import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Fragment } from "react";

function Home({ game }) {
  if (game.game) {
    return (
      <button>
        <Link to="/play">Resume Game</Link>
      </button>
    );
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
