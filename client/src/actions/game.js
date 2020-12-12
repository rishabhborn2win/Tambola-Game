import axios from "axios";
import { setAlert } from "./alert";

import {
  CREATE_GAME,
  CREATE_FAILED,
  GAME_LOADED,
  GAME_ERROR,
  DELETED_GAME,
} from "./types";

//load game if created(gamedid saved)
export const loadGame = () => async (dispatch) => {
  if (localStorage.gameid) {
    try {
      const res = await axios.get(`/game/${localStorage.gameid}`);

      dispatch({
        type: GAME_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: {
          msg: "Please create a new game",
        },
      });
    }
  } else {
    dispatch({
      type: GAME_ERROR,
      payload: {
        msg: "Please create a new game",
      },
    });
  }
};

//Notify to fill form for creating the game
export const notifyFill = (msg) => async (dispatch) => {
  dispatch(setAlert(msg, "success"));
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

    dispatch({
      type: CREATE_FAILED,
      payload: {
        msg: "Game Already exist from the host name you entered!",
      },
    });
    dispatch(setAlert("Type Unique Game Name", "danger"));

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert("Game wasn't created!!", "danger"))
      );
    }
  }
};

//Delete the Game
export const dropGame = (gameid) => async (dispatch) => {
  try {
    await axios.delete(`/game/delete/${gameid}`);

    dispatch({
      type: DELETED_GAME,
      payload: {
        msg: "Game Deleted successfully",
      },
    });
  } catch (err) {
    dispatch({
      type: CREATE_FAILED,
      payload: {
        msg: "Some error please retry",
      },
    });
  }
};
