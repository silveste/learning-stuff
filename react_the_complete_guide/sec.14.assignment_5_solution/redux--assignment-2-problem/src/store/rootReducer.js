import * as actionTypes from './actions';

const initialState = {
  persons: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_PERSON:
      return {
        ...state,
        persons: [...state.persons, action.payload]
      }
    case actionTypes.DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(person => person.id !== action.payload)
      }
    default:
      return state;
  }
}

export default rootReducer;
