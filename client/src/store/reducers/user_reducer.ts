import { REGISTER_USER, AUTH_USER, LOGIN_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
  success: false,
  loginSuccess: false,
  email: '',
  name: '',
  role: '',
  token: '',
};

export default function user_reducer(state = initialState, action: any) {
  const { payload } = action;
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, success: payload };
    case LOGIN_USER:
      return { ...state, ...payload };
    case AUTH_USER:
      return {
        ...state,
        loginSuccess: payload.loginSuccess,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      };
    case LOGOUT_USER:
      return { ...state, loginSuccess: payload.loginSuccess };
    default:
      return state;
  }
}
