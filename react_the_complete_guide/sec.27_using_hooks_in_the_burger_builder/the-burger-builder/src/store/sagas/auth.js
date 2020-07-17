import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects'
import axios from 'axios';
import * as actions from '../actions';

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'localId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action){
  yield delay(action.expirationTime*1000);
  yield put(actions.logout());
}

export function* authUserSaga(action){
    yield put(actions.authStart());
    const { email, password, isSignUp } = action
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    let signType = 'signUp';
    if (!isSignUp) {
      signType = 'signInWithPassword'
    }
    try {
      const res = yield axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${signType}?key=${process.env.REACT_APP_FIREBASE_KEY}`,
        authData);
      const { idToken, localId, expiresIn } = res.data;
      const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
      localStorage.setItem('token', idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('localId', localId);
      yield put(actions.authSuccess(idToken, localId));
      yield put(actions.checkAuthTimeout(expiresIn));
    } catch(err) {
      yield put(actions.authFail(err.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = localStorage.getItem('token');
    if (!token) {
      yield put(actions.logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const localId = localStorage.getItem('localId');
      if (expirationDate <= new Date()) {
        yield put(actions.logout());
      } else {
        yield put(actions.authSuccess(token,localId));
        yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
      }
    }
}
