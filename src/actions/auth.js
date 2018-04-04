import { auth } from '../api';
import { Auth as AUTH } from '../constants';

// - Login Action -

function requestLogin() {
  return {
    type: AUTH.LOGIN.REQUEST,
  };
}

function receiveLogin(result) {
  return {
    type: AUTH.LOGIN.SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    result,
  };
}

function loginError(error) {
  return {
    type: AUTH.LOGIN.FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error,
  };
}

export function login(credentials) {
  return (dispatch) => {
    dispatch(requestLogin());
    return new Promise((resolve, reject) => {
      return auth.addSession(credentials)
        .then((response) => {
          localStorage.setItem('viewer', JSON.stringify(response.data));
          dispatch(receiveLogin(response));
          return resolve();
        }, (response) => {
          dispatch(loginError('Sorry, unable to log  you in!'));
          return reject(response);
        });
    }).catch((error) => {
      throw new Error(error);
    });
  };
}

// - Logout Action

function requestLogout() {
  return {
    type: AUTH.LOGOUT.REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

function receiveLogout() {
  return {
    type: AUTH.LOGOUT.SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(requestLogout());
    return new Promise((resolve, reject) => {
      auth.deleteSession()
        .then(() => {
          dispatch(receiveLogout());
          localStorage.removeItem('viewer');
          return resolve();
        }, (response) => {
          return reject(response);
        }).catch((error) => {
          throw new Error(error);
        });
    });
  };
}

export function unauthorized() {
  return (dispatch) => {
    dispatch(logout());
  };
}

// - Signup Action -

function signupRequest() {
  return {
    type: AUTH.SIGNUP.REQUEST,
  };
}

function signupSuccess(response) {
  return {
    type: AUTH.SIGNUP.SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    result: response.data,
  };
}

function signupFailure(error) {
  return {
    type: AUTH.SIGNUP.FAILURE,
    isFetching: false,
    isAuthenticated: false,
    error,
  };
}

export function signup(person) {
  return (dispatch) => {
    dispatch(signupRequest());
    return new Promise((resolve, reject) => {
      return auth.signup(person)
        .then((response) => {
          dispatch(signupSuccess(response));
          return resolve();
        }, (response) => {
          dispatch(signupFailure('Sorry, unable to log  you in!'));
          return reject(response);
        });
    }).catch((error) => {
      throw new Error(error);
    });
  };
}
