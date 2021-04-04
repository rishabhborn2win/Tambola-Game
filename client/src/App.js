import { useEffect } from "react";
import Board from "./components/Board";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import JoinGameForm from "./components/JoinGameForm";
import HostForm from "./components/HostForm";
import Alert from "./components/layout/Alert";
import 'bootstrap/dist/css/bootstrap.min.css';
//Redux Tools

import { Provider } from "react-redux";
import store from "./store";
import { loadGame } from "./actions/game";
import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
 const resetGame = () => {
    localStorage.removeItem("playerid");
    localStorage.removeItem("username");
  }
  useEffect(() => {
    store.dispatch(loadGame());
  });
  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Route exact path="/" component={Home} />
        <Route exact path="/join" component={JoinGameForm} />
        <Route exact path="/create" component={HostForm} />
        <PrivateRoute exact path="/play" component={Board} />
      </Router>
      <br></br>
      <br></br>
      <a href="#top" onClick={() => resetGame()}>Click here to Reset the app!</a>
    </Provider>
  );
}

export default App;
