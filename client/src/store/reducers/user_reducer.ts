import {
    REGISTER_USER
  } from '../actions/types';

const initialState = {};

export default function user_reducer(state = initialState, action: any) {
  switch (action.type) {
    case REGISTER_USER:
      return null;
    default:
      return state;
  }
}
