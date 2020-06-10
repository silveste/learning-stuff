import * as actionTypes from './actionTypes';

export const storeResult = (payload) => {
  return {
    type: actionTypes.STORE_RESULT,
    payload
  }
}

export const asyncStoreResult = (payload) => {
  return (dispatch, getState) => {
    //Thunk also make available thrtough getState the state to use before dispatch
    setTimeout(() => {
      dispatch(storeResult(payload))
    },2000);
  }
}

export const deleteResult = (payload) => {
  return {
    type: actionTypes.DELETE_RESULT,
    payload
  }
}
