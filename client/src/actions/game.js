import axios from 'axios';
import { setAlert } from "./alert";

import { CREATE_GAME } from "./types";

//Notify to fill form for creating the game
export const notifyFill = () => async (dispatch) => {
  dispatch(setAlert("Write Down your name", "success"));
};

//Create A game
export const createGame = ({ host }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ host });
  try {
    const res = await axios.post("/game", body, config);

    dispatch({
      type: CREATE_GAME,
      payload: res.data,
    });

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }

}
