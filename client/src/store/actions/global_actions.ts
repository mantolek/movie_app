import { CHANGE_MODE } from '../actions/types';

export const changeMode = (mode: string | null) => async (dispatch: Function) => {
  dispatch({
    type: CHANGE_MODE,
    payload: mode,
  });
};
