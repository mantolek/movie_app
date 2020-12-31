import { CHANGE_MODE, CHANGE_POPUP } from '../actions/types';

const initialState = {
  mode: null,
  popup: false,
  popupErrorType: '',
};

export default function user_reducer(state = initialState, action: any) {
  const { payload } = action;
  switch (action.type) {
    case CHANGE_MODE:
      return { ...state, mode: payload };
    case CHANGE_POPUP:
      return {
        ...state,
        popup: payload.popup,
        popupErrorType: payload.popupErrorType,
      };
    default:
      return state;
  }
}
