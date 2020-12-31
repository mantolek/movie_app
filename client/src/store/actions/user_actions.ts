import axios from 'axios';
import { USER_SERVER } from '../../config/index';
import {
  REGISTER_USER,
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from '../../store/actions/types';

export const register = (dataToSubmit: any) => async (dispatch: Function) => {
  try {
    const request = await axios.post(`${USER_SERVER}/register`, dataToSubmit);

    dispatch({
      type: REGISTER_USER,
      payload: request.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = (data: any) => async (dispatch: Function) => {
  try {
    const request = await axios.post(`${USER_SERVER}/login`, data);
    localStorage.setItem('userLoggedIn', request.data.token);

    dispatch({
      type: LOGIN_USER,
      payload: request.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const auth = () => async (dispatch: Function) => {
  const token = localStorage.getItem('userLoggedIn');
  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token || '',
    },
  };

  try {
    const request = await axios.get(`${USER_SERVER}/auth`, config);
    dispatch({
      type: AUTH_USER,
      payload: request.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => async (dispatch: Function) => {
  const token = localStorage.getItem('userLoggedIn');
  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token || '',
    },
  };

  const request = await axios.get(`${USER_SERVER}/logout`, config);

  localStorage.removeItem('userLoggedIn');

  dispatch({
    type: LOGOUT_USER,
    payload: request.data,
  });
};
