import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {RESET_STATE} from '../types';

//Reducers
import AuthReducer from './AuthReducer';

const appReducer = combineReducers({
  Auth: AuthReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
    AsyncStorage.removeItem('persist:root');
  }
  return appReducer(state, action);
};

export default rootReducer;
