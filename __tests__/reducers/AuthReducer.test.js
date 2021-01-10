import reducer from '../../src/store/reducers/AuthReducer';
import * as actionTypes from '../../src/store/types';
import expect from 'expect';

const initState = {
  accessToken: null,
  status: actionTypes.queryStatus.NONE,
  user: {
    status: actionTypes.queryStatus.NONE,
    userInfo: null,
  },
};

describe('Loading Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle LOGOUT CASE', () => {
    const app = {
      type: actionTypes.LOG_OUT,
    };

    expect(
      reducer(
        {
          ...initState,
          accessToken: 'token',
          user: {
            status: actionTypes.queryStatus.LOADING,
            userInfo: 'user',
          },
        },
        app,
      ),
    ).toEqual(initState);
  });

  it('should handle LOGIN_ATTEMPT CASE', () => {
    const app = {
      type: actionTypes.LOGIN_ATTEMPT,
    };

    expect(reducer(initState, app)).toEqual({
      ...initState,
      status: actionTypes.queryStatus.LOADING,
    });
  });

  it('should handle LOGIN_SUCCESS CASE', () => {
    const app = {
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        name: 'name',
        email: 'email',
      },
    };

    expect(reducer(initState, app)).toEqual({
      ...initState,
      status: actionTypes.queryStatus.SUCCESS,
      user: {
        status: actionTypes.queryStatus.NONE,
        userInfo: {
          name: 'name',
          email: 'email',
        },
      },
    });
  });

  it('should handle LOGIN_FAILURE CASE', () => {
    const app = {
      type: actionTypes.LOGIN_FAILURE,
    };

    expect(reducer(initState, app)).toEqual({
      ...initState,
      status: actionTypes.queryStatus.FAILURE,
      user: {
        status: actionTypes.queryStatus.NONE,
        userInfo: null,
      },
    });
  });

  it('should handle GET_USER_INFO_ATTEMPT CASE', () => {
    const app = {
      type: actionTypes.GET_USER_INFO_ATTEMPT,
    };

    expect(reducer(initState, app)).toEqual({
      ...initState,
      user: {
        status: actionTypes.queryStatus.LOADING,
        userInfo: null,
      },
    });
  });

  it('should handle GET_USER_INFO_SUCCESS CASE', () => {
    const app = {
      type: actionTypes.GET_USER_INFO_SUCCESS,
    };

    expect(
      reducer(
        {
          ...initState,
          user: {
            status: actionTypes.queryStatus.NONE,
            userInfo: {
              name: 'name',
              email: 'email',
            },
          },
        },
        app,
      ),
    ).toEqual({
      ...initState,
      user: {
        status: actionTypes.queryStatus.SUCCESS,
        userInfo: {
          name: 'name',
          email: 'email',
        },
      },
    });
  });

  it('should handle GET_USER_INFO_FAILURE CASE', () => {
    const app = {
      type: actionTypes.GET_USER_INFO_FAILURE,
    };

    expect(
      reducer(
        {
          ...initState,
          user: {
            status: actionTypes.queryStatus.NONE,
            userInfo: {
              name: 'name',
              email: 'email',
            },
          },
        },
        app,
      ),
    ).toEqual({
      ...initState,
      user: {
        status: actionTypes.queryStatus.FAILURE,
        userInfo: null,
      },
    });
  });
});
