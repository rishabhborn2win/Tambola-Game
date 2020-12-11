import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Home() {
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

export default connect(null)(Home);
