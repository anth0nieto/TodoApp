import {generateDispatch} from '@utils';
import {googleLogIn} from '../../config/googleauth';
import * as actionTypes from '../types';

export const loadAccessToken = (token) => () => {
  return async (dispatch) => {
    dispatch(generateDispatch(actionTypes.LOAD_ACCESS_TOKEN, token));
  };
};

export const logout = () => () => {
  return async (dispatch) => {
    dispatch(generateDispatch(actionTypes.LOG_OUT));
  };
};

export const getNotifications = () => async () => {};

export const logInUser = () => {
  return async (dispatch) => {
    dispatch(generateDispatch(actionTypes.LOGIN_ATTEMPT));
    let response = await googleLogIn();
    if (response) {
      dispatch(
        generateDispatch(actionTypes.LOAD_ACCESS_TOKEN, response.user.token),
      );
      dispatch(generateDispatch(actionTypes.LOGIN_SUCCESS, response.user));
      return {status: 200, data: response.user};
    } else {
      dispatch(generateDispatch(actionTypes.LOGIN_FAILURE));
      return {statue: 500, data: response};
    }
  };
};

export const getUser = (accessToken) => {
  return async (dispatch) => {
    dispatch(generateDispatch(actionTypes.GET_USER_INFO_ATTEMPT));
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
    );

    if (userInfoResponse.status === actionTypes.responseType.SUCCESS) {
      dispatch(generateDispatch(actionTypes.GET_USER_INFO_SUCCESS));
      return {status: userInfoResponse.status};
    } else {
      dispatch(generateDispatch(actionTypes.GET_USER_INFO_FAILURE));
      return {status: 500, data: userInfoResponse};
    }
  };
};

export const resetState = () => {
  return async (dispatch) => {
    dispatch(generateDispatch(actionTypes.RESET_STATE));
  };
};
