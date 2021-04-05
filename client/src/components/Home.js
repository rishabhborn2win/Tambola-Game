import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";
import { Button } from "react-bootstrap";
import "./style.css";
import Heading from "./Heading";
import { Fragment } from "react";

function Home({ game }) {
  if (localStorage.gameid || localStorage.playerid) {
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
