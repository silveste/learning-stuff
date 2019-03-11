import { TRY_AUTH } from './actionTypes';

export const tryAuth = authData => authSingUp(authData);

export const authSingUp = authData => () => {
  fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDlnvxBmDS7BmxsCfTX5rb5ekDxFctprrM', {
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
    })
    .then(res => res.json())
    .then(parsedRes => alert(JSON.stringify(parsedRes)));
};
