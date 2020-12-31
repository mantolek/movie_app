import { CHANGE_MODE } from '../actions/types';

const initialState = {
  mode: null
};

export default function user_reducer(state = initialState, action: any) {
  const { payload } = action;
  switch (action.type) {
    case CHANGE_MODE:
      return { ...state, mode: payload };
    default:
      return state;
  }
}
