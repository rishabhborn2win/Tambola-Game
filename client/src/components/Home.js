import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";


function Home({game}) {
  if(game){
    <Redirect to='/play'></Redirect>
  }
  return (
    <div>
      <button to="/join">
        <Link to="/join">Join Game</Link>
      </button>
      <button to="/create">
        <Link to="/create">Create A Game</Link>
      </button>
    </div>
  );
}
Home.propTypes = {
  game: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  game: state.game.game
})

export default connect(mapStateToProps)(Home);
