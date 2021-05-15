import React from 'react'
import { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { notifyFill, createGame } from "../actions/game";
import Heading from "./Heading";

const HostForm = ({ notifyFill, createGame, game }) => {
  const [formData, setFormData] = useState({
    host: "",
  });

  if (game) {
    return <Redirect to="/play"></Redirect>;
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { host } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (host.length < 3) {
      notifyFill("Host name is req. (Min : 3 char)");
    } else {
      createGame({ host });
    }
  };
  return (
    <Fragment>
      <Heading text="Create Game," />
      {/* <span class="text-span">Create Game:-</span> */}
      <div className="container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              placeholder="Host Name"
              className="input-fields"
              type="text"
              id="host"
              name="host"
              onChange={(e) => onChange(e)}
            ></input>
          </div>
          <input
            type="submit"
            value="Create Game"
            class="btn-lg  float-right"
          ></input>
        </form>
      </div>
    </Fragment>
  );
};

HostForm.prototype = {
  notifyFill: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game.game,
});

export default connect(mapStateToProps, { notifyFill, createGame })(
  withRouter(HostForm)
);
