import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('localId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    let signType = 'signUp';
    if (!isSignUp) {
      signType = 'signInWithPassword'
    }
    axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${signType}?key=${process.env.REACT_APP_FIREBASE_KEY}`,
      authData)
    .then(res => {
      const { idToken, localId, expiresIn } = res.data;
      const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
      localStorage.setItem('token', idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('localId', localId);
      dispatch(authSuccess(idToken, localId))
      dispatch(checkAuthTimeout(expiresIn))
    })
    .catch(err => dispatch(authFail(err.response.data.error)))
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const localId = localStorage.getItem('localId');
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token,localId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
      }
    }
  }
}
