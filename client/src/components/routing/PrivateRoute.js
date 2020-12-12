import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, game, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !game.game ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

PrivateRoute.propTypes = {
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(PrivateRoute);
