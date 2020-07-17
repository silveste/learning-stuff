import * as actionTypes from '../actions/actionTypes';
const initialState = {
  results: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({value: action.payload, id: new Date()})
      }
    case actionTypes.DELETE_RESULT:
      const newResults = state.results.filter(result => action.payload !== result.id)
      return {
        ...state,
        results: newResults
      }
    default:
      return state;
  }
}

export default reducer;
