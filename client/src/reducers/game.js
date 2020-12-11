import {
   CREATE_GAME
  } from "../actions/types";
  
  const initialState = {
    game:{},
    loading: true,
    error: {},
  };

  export default function abc(state = initialState, action){
      const { type, payload } = action;
      switch (type) {
        case CREATE_GAME:
          return {
            ...state,
            game: payload,
            loading: false,
            error: {},
          };
          default: 
          return {
              ...state
          }
        }
  }
