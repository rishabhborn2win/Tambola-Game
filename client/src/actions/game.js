import axios from "axios";
import { set } from "mongoose";
import { setAlert } from "./alert";

import {
  CREATE_GAME,
  CREATE_FAILED,
  GAME_LOADED,
  GAME_ERROR,
  DELETED_GAME,
  NEXT_NUMBER,
  JOIN_GAME,
  JOIN_FAILED,
  GAME_LEAVE
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
  }else if(localStorage.playerid){
    try {
      const res = await axios.get(`/game/join/${localStorage.playerid}`);
      dispatch({
        type: GAME_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: {
          msg: "Please create a new game",
        },
      });
    }
  } 
  else {
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
    dispatch({
      type: CREATE_FAILED,
      payload: {
        msg: "Game Already exist from the host name you entered!",
      },
    });
    dispatch(setAlert("Type Unique Game Name", "danger"));
  }
};

//Delete the Game
export const dropGame = (gameid) => async (dispatch) => {
  if (window.confirm("Are you Sure? This can not be undone")) {
  try {
    await axios.delete(`/game/delete/${gameid}`);

    dispatch({
      type: DELETED_GAME,
      payload: {
        msg: "Game Deleted successfully",
      },
    });
    dispatch(setAlert("Game Deleted", "danger"));

    
  } catch (err) {
    dispatch({
      type: CREATE_FAILED,
      payload: {
        msg: "Some error please retry",
      },
    });
  }
}
};

//Calling the number
export const nextNumber = (gameid) => async (dispatch) => {
  try {
    const res = await axios.put(`/game/${gameid}/next`);
    dispatch({
      type: NEXT_NUMBER,
    });
    dispatch({
      type: GAME_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_FAILED,
      payload: {
        msg: "Some error please retry",
      },
    });
  }
};

//Join the game
export const joinGame = (playername, gameID) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({playername: playername, id: gameID});
    try {
      const res = await axios.put('/game/join/play', body, config);
      dispatch({
        type: JOIN_GAME,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: JOIN_FAILED,
        payload: {
          msg: "Some Error happen"
        }
      })
      dispatch(setAlert("Wrong Room ID", "Danger"));

  }

}

//leave the game
export const leaveGame = () => async (dispatch) => {
  dispatch({
    type: GAME_LEAVE
  })
}