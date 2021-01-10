import {
  queryStatus,
  SAVE_USER_INFO,
  LOAD_ACCESS_TOKEN,
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_INFO_FAILURE,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ATTEMPT,
  LOG_OUT,
} from '../types';

const initState = {
  accessToken: null,
  status: queryStatus.NONE,
  user: {
    status: queryStatus.NONE,
    userInfo: null,
  },
};

export const AuthReducer = (state = initState, action) => {
  let newState = {...state};

  switch (action.type) {
    case LOGIN_ATTEMPT:
      newState.status = queryStatus.LOADING;
      return newState;

    case LOGIN_SUCCESS:
      newState.status = queryStatus.SUCCESS;
      newState.user.userInfo = action.payload;
      return newState;

    case LOGIN_FAILURE:
      newState.status = queryStatus.FAILURE;
      newState.user.userInfo = null;
      return newState;

    case GET_USER_INFO_ATTEMPT:
      newState.user.status = queryStatus.LOADING;
      return newState;

    case GET_USER_INFO_SUCCESS:
      newState.user.status = queryStatus.SUCCESS;
      return newState;

    case GET_USER_INFO_FAILURE:
      newState.user.status = queryStatus.FAILURE;
      newState.user.userInfo = null;
      newState.accessToken = null;
      return newState;

    // SAVE USER INFO
    case SAVE_USER_INFO:
      newState.user.userInfo = action.payload;
      return newState;

    // SAVE ACCESS TOKEN
    case LOAD_ACCESS_TOKEN:
      newState.accessToken = action.payload;
      return newState;

    case LOG_OUT:
      newState.accessToken = null;
      newState.status = queryStatus.NONE;
      newState.user.status = queryStatus.NONE;
      newState.user.userInfo = null;
      return newState;

    default:
      //return newState;
      return state;
  }
};

export default AuthReducer;
