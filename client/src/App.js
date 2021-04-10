import { useEffect } from "react";
import Board from "./components/Board";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import JoinGameForm from "./components/JoinGameForm";
import HostForm from "./components/HostForm";
import Alert from "./components/layout/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import WhatsAppWidget from 'react-whatsapp-widget'
import 'react-whatsapp-widget/dist/index.css'
//Redux Tools

import { Provider } from "react-redux";
import store from "./store";
import { loadGame } from "./actions/game";
import PrivateRoute from "./components/routing/PrivateRoute";
import Header from "./components/header/Header";

function App() {
  useEffect(() => {
    store.dispatch(loadGame());
  });
  return (
    <Provider store={store}>
      <Router>
        <Header />

        <Alert />
        <Route exact path="/" component={Home} />
        <Route exact path="/join" component={JoinGameForm} />
        <Route exact path="/create" component={HostForm} />
        <PrivateRoute exact path="/play" component={Board} />
        <WhatsAppWidget phoneNumber='+918840576544' companyName={"Rishabh Mishra"} textReplyTime={"ASAP"}/>
      </Router>
    </Provider>
  );
}

export default App;
