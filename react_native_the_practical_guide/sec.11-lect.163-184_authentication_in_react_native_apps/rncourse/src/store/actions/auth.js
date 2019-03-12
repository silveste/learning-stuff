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
        dispatch(authSetToken(parsedRes.idToken));
        startTabs();
      } else {
        alert('Authentication failed');
      }
    });
};

export const authSetToken = token => ({
  type: AUTH_SET_TOKEN,
  token
});

export const getAuthToken = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const { token } = getState().auth;
  if (!token) {
    reject();
  } else {
    resolve(token);
  }
});
