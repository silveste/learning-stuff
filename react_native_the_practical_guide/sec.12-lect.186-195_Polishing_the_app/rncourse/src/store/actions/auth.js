import { AsyncStorage } from 'react-native';
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStopLoading, uiStartLoading } from './index';
import startTabs from '../../screens/MainTabs/startMainTabs';
import App from '../../../App';

const API_KEY = 'AIzaSyDlnvxBmDS7BmxsCfTX5rb5ekDxFctprrM';

export const tryAuth = (authData, authMode) => (dispatch) => {
  dispatch(uiStartLoading());
  const urlAuthMode = authMode === 'login'
    ? 'verifyPassword'
    : 'signupNewUser';
  return fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${urlAuthMode}?key=${API_KEY}`, {
    method: 'POST',
    body: JSON.stringify({
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw (new Error(res));
    })
    .then((parsedRes) => {
      if (parsedRes.idToken) {
        dispatch(uiStopLoading());
        dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
        startTabs();
      } else {
        throw (new Error('Invalid token'));
      }
    })
    .catch((err) => {
      console.log(err);
      alert('Authentication failed');
      dispatch(uiStopLoading());
    });
};

export const authStoreToken = (token, expiresIn, refreshToken) => (dispatch) => {
  const now = new Date();
  // For debugging purposes
  // const expirationTime = now.getTime() + 20 * 1000;
  // For production
  const expirationTime = now.getTime() + expiresIn * 1000;
  dispatch(authSetToken(token, expirationTime));

  AsyncStorage.setItem('ap:auth:token', token);
  AsyncStorage.setItem('ap:auth:expiration', expirationTime.toString());
  AsyncStorage.setItem('ap:auth:refreshToken', refreshToken);
};

export const authSetToken = (token, expirationTime) => ({
  type: AUTH_SET_TOKEN,
  token,
  expirationTime
});

export const getAuthToken = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const { token, expirationTime } = getState().auth;
  if (!token || new Date(expirationTime) <= new Date()) {
    AsyncStorage.getItem('ap:auth:expiration')
      .then((expireDate) => {
        if (expireDate) {
          const parsedExpireDate = new Date(parseInt(expireDate, 10));
          const now = new Date();
          if (parsedExpireDate > now) {
            return AsyncStorage.getItem('ap:auth:token');
          }
          return dispatch(authRefreshStorage);
        }
        return reject();
      })
      .then((tokenFromStorage) => {
        if (tokenFromStorage) {
          dispatch(authSetToken(tokenFromStorage));
          resolve(tokenFromStorage);
        } else {
          reject();
        }
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    resolve(token);
  }
});

export const authAutoSignIn = () => dispatch => dispatch(getAuthToken())
  .then(() => startTabs())
  .catch(() => console.log('Failed to fetch token'));

export const authRefreshStorage = dispatch => AsyncStorage.getItem('ap:auth:refreshToken')
  .then(refreshToken => fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`
  }))
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw (new Error(res));
  })
  .then((parsedRes) => {
    if (!parsedRes.id_token) {
      throw (new Error('Invalid token'));
    }
    dispatch(authStoreToken(
      parsedRes.id_token,
      parsedRes.expires_in,
      parsedRes.refresh_token
    ));
    return parsedRes.id_token;
  })
  .catch((err) => {
    console.log(err);
    dispatch(authClearStorage());
  });

export const authClearStorage = () => () => Promise.all(
  AsyncStorage.removeItem('ap:auth:token'),
  AsyncStorage.removeItem('ap:auth:expiration'),
  AsyncStorage.removeItem('ap:auth:refreshToken')
);

export const authLogout = () => (dispatch) => {
  dispatch(authClearStorage())
    .then(() => App());
  dispatch(authremoveToken());
};

export const authremoveToken = () => ({ type: AUTH_REMOVE_TOKEN });
