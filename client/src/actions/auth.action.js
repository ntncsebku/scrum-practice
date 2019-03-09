import Axios from 'axios';

import * as actionTypes from './actionTypes';
import { loadUserData, storeUserData } from '../utils/localStorage';

export function logInUser(username, password) {
  return async function (dispatch) {
    try {
      const res = await Axios.post('/api/auth/login', { username, password });
      const data = res.data;
      const { user, token } = data;
      storeUserData({ user, token });
      dispatch({ type: actionTypes.LOGIN_USER_SUCCESSFUL, payload: user });
    } catch (e) {
      alert('Username or password is wrong');
      dispatch({ type: actionTypes.LOGIN_USER_FAILED });
    }
  };
}

export function logOutUser() {
  localStorage.clear();
  return { type: actionTypes.LOGOUT_USER };
}
