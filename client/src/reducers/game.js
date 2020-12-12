import {
  CREATE_FAILED,
  CREATE_GAME,
  GAME_LOADED,
  GAME_ERROR,
  DELETED_GAME,
  NEXT_NUMBER,
  JOIN_FAILED,
  JOIN_GAME,
  GAME_LEAVE,
} from "../actions/types";

const initialState = {
  game: null,
  loading: true,
  error: {},
};

export default function abc(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_GAME:
      localStorage.setItem("gameid", payload._id);
      return {
        ...state,
        game: payload,
        loading: false,
        error: {},
      };
    case GAME_LOADED:
      return {
        ...state,
        game: payload,
        loading: false,
        error: {},
      };
    case DELETED_GAME:
      localStorage.removeItem("gameid");
      return {
        ...state,
        game: null,
        loading: false,
      };
    case NEXT_NUMBER:
      return {
        ...state,
      };
    case JOIN_GAME:
      localStorage.setItem("playerid", payload.gameID);
      return {
        ...state,
        game: payload,
        loading: false,
      };
    case GAME_LEAVE:
      localStorage.removeItem("playerid");
      return {
        ...state,
        game: null,
        loading: false,
      };
    case JOIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.msg,
      };
    case CREATE_FAILED:
    case GAME_ERROR:
    default:
      return {
        ...state,
        game: null,
        loading: false,
      };
  }
}
