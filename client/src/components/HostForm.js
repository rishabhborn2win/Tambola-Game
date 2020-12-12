import {useState} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { notifyFill, createGame } from "../actions/game";
const HostForm = ({ notifyFill, createGame, game }) => {
    const [formData, setFormData] = useState({
        host: ""
      });

      if(game){
        return <Redirect to='/play'></Redirect>
      }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const { host } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if(host === "")  {
    notifyFill("Write down Your name");
    }else{
    createGame({host});
    }
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <label for="host"></label>
        <input type="text" id="host" name="host" onChange={(e) => onChange(e)}></input>
        <input type="submit" value="Create Game"></input>
      </form>
    </div>
  );
};

HostForm.prototype = {
  notifyFill: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game.game
})

export default connect(mapStateToProps, { notifyFill, createGame })(withRouter(HostForm));
