// import Board from './components/Board';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home'
import JoinGameForm from './components/JoinGameForm';
import HostForm from './components/HostForm'

//Redux Tools
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/join" component={JoinGameForm} />
        <Route exact path="/create" component={HostForm} />
      </Router>
    </Provider>
  );
}

export default App;
