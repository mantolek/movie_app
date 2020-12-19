import { REGISTER_USER } from '../../store/actions/types';

export const registerUser = (dataToSubmit: any) => async (dispatch: Function) => {

  
    dispatch({
      type: REGISTER_USER,
      payload: '',
    });
  };