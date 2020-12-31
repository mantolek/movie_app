import { CHANGE_MODE, CHANGE_POPUP } from '../actions/types';

export const changeMode = (mode: string | null) => async (dispatch: Function) => {
  dispatch({
    type: CHANGE_MODE,
    payload: mode,
  });
};

export const changePopup = (popup: boolean, popupErrorType: string) => async (dispatch: Function) => {
  dispatch({
    type: CHANGE_POPUP,
    payload: {
      popup,
      popupErrorType
    },
  });
};
