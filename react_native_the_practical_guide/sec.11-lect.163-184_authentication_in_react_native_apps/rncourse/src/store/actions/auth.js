import { AsyncStorage } from 'react-native';
import { AUTH_SET_TOKEN } from './actionTypes';
import { uiStopLoading, uiStartLoading } from './index';
import startTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => (dispatch) => {
  dispatch(uiStartLoading());
  const apiKey = 'AIzaSyDlnvxBmDS7BmxsCfTX5rb5ekDxFctprrM';
  const urlAuthMode = authMode === 'login'
    ? 'verifyPassword'
    : 'signupNewUser';
  return fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${urlAuthMode}?key=${apiKey}`, {
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
    .catch((err) => {
      console.log(err);
      alert('Authentication failed');
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then((parsedRes) => {
      dispatch(uiStopLoading());
      if (parsedRes.idToken) {
        dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
        startTabs();
      } else {
        alert('Authentication failed');
      }
    });
};

export const authStoreToken = (token, expiresIn) => (dispatch) => {
  dispatch(authSetToken(token));
  const now = new Date();
  const expirationTime = now.getTime() + expiresIn * 1000;
  AsyncStorage.setItem('ap:auth:token', token);
  AsyncStorage.setItem('ap:auth:expiration', expirationTime.toString());
};

export const authSetToken = token => ({
  type: AUTH_SET_TOKEN,
  token
});

export const getAuthToken = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const { token } = getState().auth;
  if (!token) {
    AsyncStorage.getItem('ap:auth:expiration')
      .then((expireDate) => {
        if (expireDate) {
          const parsedExpireDate = new Date(parseInt(expireDate, 10));
          const now = new Date();
          if (parsedExpireDate > now) {
            return AsyncStorage.getItem('ap:auth:token');
          }
        }
        dispatch(authClearStorage);
        return reject();
      })
      .then((tokenFromStorage) => {
        if (tokenFromStorage) {
          dispatch(authSetToken(tokenFromStorage));
          resolve(tokenFromStorage);
        } else {
          dispatch(authClearStorage);
          reject();
        }
      })
      .catch((err) => {
        dispatch(authClearStorage);
        reject(err);
      });
  } else {
    resolve(token);
  }
});

export const authAutoSignIn = () => dispatch => dispatch(getAuthToken())
  .then(() => startTabs())
  .catch(() => console.log('Failed to fetch token'));

export const authClearStorage = () => {
  AsyncStorage.removeItem('ap:auth:token');
  AsyncStorage.removeItem('ap:auth:expiration');
};
