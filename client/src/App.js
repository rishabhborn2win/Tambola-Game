import React, { useEffect } from "react";
import Board from "./components/Board";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import JoinGameForm from "./components/JoinGameForm";
import HostForm from "./components/HostForm";
import Alert from "./components/layout/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
//Redux Tools

import { Provider } from "react-redux";
import store from "./store";
import { loadGame } from "./actions/game";
import PrivateRoute from "./components/routing/PrivateRoute";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/AboutUs";
import Help from "./components/Help";
import GenerateTicketForm from "./components/GenerateTicketForm";
import TicketList from "./components/TicketList";
// import Ticket from "./components/Ticket";
// import 'bootstrap/dist/css/bootstrap.min.js';

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
        <Route exact path="/aboutus" component={AboutUs} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/generate/ticket" component={GenerateTicketForm} />
        {/* <Route exact path="/ticketlist" component={TicketList} /> */}
        <PrivateRoute exact path="/play" component={Board} />
        <Footer></Footer>
      </Router>
    </Provider>
  );
}

export default App;
