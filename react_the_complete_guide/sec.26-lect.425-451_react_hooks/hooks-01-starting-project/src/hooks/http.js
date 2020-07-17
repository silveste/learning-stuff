import { useReducer, useCallback } from 'react';

const initialState = {
  isLoading: false,
  error: null,
  data: null,
  reqParams: null,
  method: null
}

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { isLoading: true, error: null, data: null, reqParams: action.reqParams, method: action.method };
    case 'RESPONSE':
      return { ...httpState, isLoading: false, data: action.responseData };
    case 'ERROR':
      return { error: action.error, isLoading: false };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error(`httpReducer -  Unknown action type: ${action.type}`)
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clearRequest = useCallback( () => dispatchHttp({ type: 'CLEAR' }),[]);

  const sendRequest = useCallback((url, method = 'GET', reqParams) => {
    dispatchHttp({ type: 'SEND', reqParams, method });
    fetch(
      url,
      {
        method,
        body: JSON.stringify(reqParams),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(res => res.json())
    .then(res => {
      dispatchHttp({ type: 'RESPONSE', responseData: res });
    })
    .catch(err => dispatchHttp({ type: 'ERROR', error: err.message }));
  },[]);

  return {...httpState, sendRequest, clearRequest};
}

export default useHttp;
