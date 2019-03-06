import Axios from 'axios';

import * as actionTypes from './actionTypes';
import { loadUserData, storeUserData } from '../utils/localStorage';

export function logInUser(username, password) {
    return async function (dispatch) {
        try {
            const { data: accessToken } = await Axios.get(`/api/user/login?username=${username}&password=${password}`);
            const user = { username, password, accessToken }
            storeUserData(user);
            dispatch({ type: actionTypes.LOGIN_USER_SUCCESSFUL, payload: user });
        } catch(e) {
            console.log(e);
            dispatch({ type: actionTypes.LOGIN_USER_FAILED });
        }
    }
}

export function signUp(username, password) {
  return async function (dispatch) {
      try {
          await Axios.post('/api/auth/register', {username, password});
          dispatch({ type: actionTypes.SIGNUP_SUCCESS});
      } catch(e) {
          console.log(e);
          dispatch({ type: actionTypes.SIGNUP_ERROR });
      }
  }
}

export function logOutUser() {
    localStorage.clear();
    return { type: actionTypes.LOGOUT_USER };
}
