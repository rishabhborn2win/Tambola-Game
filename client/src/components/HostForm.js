import {useState} from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { notifyFill, createGame } from "../actions/game";
const HostForm = ({ notifyFill, createGame }) => {
    const [formData, setFormData] = useState({
        host: ""
      });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const { host } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    notifyFill();
    createGame({host});
  };
  return (
    <div>
      <form action="/" onSubmit={(e) => onSubmit(e)}>
        <label for="host"></label>
        <input type="text" id="host" name="host" onChange={(e) => onChange(e)}></input>
        <input type="submit" value="Create Game"></input>
      </form>
    </div>
  );
};

HostForm.prototype = {
  notifyFill: PropTypes.func.isRequired,
};

export default connect(null, { notifyFill, createGame })(withRouter(HostForm));
