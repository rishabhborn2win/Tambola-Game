import {
  CREATE_FAILED,
   CREATE_GAME,
   GAME_LOADED, GAME_ERROR
  } from "../actions/types";
  
  const initialState = {
    game: null,
    loading: true,
    error: {},
  };

  export default function abc(state = initialState, action){
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
            error: {}
          };
          case CREATE_FAILED:
          case GAME_ERROR:
          default: 
          return {
              ...state
          }
        }
  }
