// import axios from 'axios';
import {setAlert } from './alert';

import {
    CREATE_GAME
} from './types';

//Notify to fill form for creating the game
export const notifyFill = () =>  async (dispatch) =>{

    dispatch(setAlert("Write Down your name", "success"));

}