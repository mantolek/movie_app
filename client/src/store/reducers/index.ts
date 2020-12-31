import { combineReducers } from 'redux';
import user_reducer from './user_reducer';
import global_reducer from './global_reducer';

const rootReducer = combineReducers({
  user: user_reducer,
  global: global_reducer
});

export default rootReducer;
