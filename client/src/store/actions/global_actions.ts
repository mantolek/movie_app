import { CHANGE_MODE } from '../actions/types';

export const changeMode = (mode: boolean) => async (dispatch: Function) => {
  if (mode) {
    document.documentElement.style.setProperty('--bg', '#fff');
  } else {
    document.documentElement.style.setProperty('--bg', 'rgb(221, 172, 172)');
  }

  dispatch({
    type: CHANGE_MODE,
    payload: mode,
  });
};
