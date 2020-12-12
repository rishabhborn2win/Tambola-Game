import { useEffect } from 'react'
import Board from './components/Board';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import JoinGameForm from "./components/JoinGameForm";
import HostForm from "./components/HostForm";
import Alert from "./components/layout/Alert";

//Redux Tools

import { Provider } from "react-redux";
import store from "./store";
import { loadGame } from './actions/game';

function App({game}) {

   
  useEffect(() => {
    store.dispatch(loadGame());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Route exact path="/" component={Home} />
        <Route exact path="/join" component={JoinGameForm} />
        <Route exact path="/create" component={HostForm} />
        <Route exact path="/play" component={Board} />
      </Router>
    </Provider>
  );
}


export default App;
