import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";
import { Button } from "react-bootstrap";


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
    <div class="container">
      <Button variant="success" className="button-lg"><Link to="/join">Join Game</Link></Button> {" "}
      <Button variant="success"><Link to="/create">Create A Game</Link></Button>
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
