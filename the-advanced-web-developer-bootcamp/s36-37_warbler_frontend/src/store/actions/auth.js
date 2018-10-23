import {apiCall} from '../../services/api';
import {SET_CURRENT_USER} from '../actionsTypes';
import { addError } from './errors';

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout(){
  return dispatch => {
    localStorage.clear();
    dispatch(setCurrentUser({}));
  };
}

export function authUser(type,userData){
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall('POST', `/api/auth/${type}`, userData)
        .then( ({token, ...user}) =>{
          localStorage.setItem('jwtToken', token);
          dispatch(setCurrentUser(user));
          resolve(); //API call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject(); //API call failed
        });
    });
  };
}
