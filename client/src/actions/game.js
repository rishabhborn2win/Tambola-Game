import axios from "axios";
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
  GAME_LEAVE,
  GENERATE_FAILED,
  TICKET_GENERATED,
  TICKET_LOADED,
  TICKET_LOADING,
  GAME_LOADING,
  JOIN_LOADING,
  DIVIDEND_UPDATED,
  DIVIDEND_UPDATED_FAILED,
} from "./types";

//load game if created(gamedid saved)
export const loadGame = () => async (dispatch) => {
  dispatch({
    type: GAME_LOADING,
  });
  if (localStorage.gameid) {
    try {
      const res = await axios.get(`/game/${localStorage.gameid}`);
      if (!res.data) {
        dispatch(setAlert("There is No Valid game! Reset The app.."));
      }
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
      // dispatch(setAlert("Server Error, Please Wait As we Resume..", "danger"));
    }
  } else if (localStorage.playerid) {
    try {
      const res = await axios.get(`/game/join/${localStorage.playerid}`);
      if (!res.data) {
        dispatch(
          setAlert("GAME NOT EXIST!! You will be redirected to Home!", "danger")
        );
        localStorage.removeItem("playerid");
        localStorage.removeItem("username");
        localStorage.removeItem("ticketid");
        localStorage.removeItem("player");
      } else {
        dispatch({
          type: GAME_LOADED,
          payload: res.data,
        });
      }
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

export const refreshGame = () => async (dispatch) => {
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
      // dispatch(setAlert("Server Error, Please Wait As we Resume..", "danger"));
    }
  } else if (localStorage.playerid) {
    try {
      const res = await axios.get(`/game/join/${localStorage.playerid}`);
      if (!res.data) {
        dispatch(
          setAlert("GAME NOT EXIST!! You will be redirected to Home!", "danger")
        );
        localStorage.removeItem("playerid");
        localStorage.removeItem("username");
        localStorage.removeItem("ticketid");
        localStorage.removeItem("player");
      } else {
        dispatch({
          type: GAME_LOADED,
          payload: res.data,
        });
      }
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
  dispatch(setAlert(msg, "danger"));
};

//Create A game
export const createGame =
  ({ host }) =>
  async (dispatch) => {

    dispatch({
      type: GAME_LOADING
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ host });
    dispatch({
      type: GAME_LOADING,
    });
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
  dispatch({
    type: JOIN_LOADING,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ playername: playername, id: gameID });
  try {
    const res = await axios.put("/game/join/play", body, config);
    dispatch({
      type: JOIN_GAME,
      payload: res.data,
    });
    localStorage.setItem("username", playername);
    // dispatch(setAlert("Joined Successfully", "success"));
  } catch (err) {
    dispatch({
      type: JOIN_FAILED,
      payload: {
        msg: "Some Error happen",
      },
    });
    const errors = err.response ? err.response.data.errors : {};

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//leave the game
export const leaveGame = (gameid, username) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username: username, gameID: gameid });
  if (window.confirm("Are you Sure?")) {
    try {
      await axios.post("/game/leave", body, config);
      dispatch({
        type: GAME_LEAVE,
        payload: {
          msg: "Game Deleted successfully",
        },
      });
      dispatch(setAlert("Game Left", "danger"));
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

//Generate ticket
export const generateTicket = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    gameid: formData.gameID,
    playerid: formData.playerid,
  });
  try {
    let res = await axios.post(
      `/game/generate/ticket/${formData.noOfTickets}/${formData.playername}`,
      body,
      config
    );
    dispatch({
      type: TICKET_GENERATED,
      payload: res.data,
    });

    alert(
      `${res.data.name}, Your Tickets are successfully Generated!`,
      "success"
    );
  } catch (err) {
    dispatch({
      type: GENERATE_FAILED,
      payload: {
        msg: err.message,
      },
    });
  }
};

//Fetch ticket using ticket id
export const loadTicket = () => async (dispatch) => {
  dispatch({
    type: TICKET_LOADING,
  });
  try {
    let res;
    if (!localStorage.ticketId) {
      dispatch({
        type: TICKET_LOADING,
      });
    }
    if (localStorage.ticketId !== "" && localStorage.ticketId !== undefined) {
      res = await axios.get(`/game/ticket/${localStorage.ticketId}`);
    }

    if (!res.data)
      dispatch(setAlert("There is not ticket Against this ticket id!"));
    dispatch({
      type: TICKET_LOADED,
      payload: res.data,
    });
    // dispatch(loadGame());
  } catch (err) {
    dispatch({
      type: GENERATE_FAILED,
      payload: {
        msg: err.message,
      },
    });
  }
};

//to update the leaderboard
export const updateDividend =
  (gameid, playername, score, nameOfPrize) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ gameid, playername, score, nameOfPrize });
    try {
      let res = await axios.put("/game/update/score/dividend", body, config);
      dispatch({
        type: DIVIDEND_UPDATED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: DIVIDEND_UPDATED_FAILED,
        payload: error.message,
      });
    }
  };
