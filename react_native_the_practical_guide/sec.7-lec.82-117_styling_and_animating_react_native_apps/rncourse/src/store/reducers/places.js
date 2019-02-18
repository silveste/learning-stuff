import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
  places: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          /*
          Math.random is not a correct solution to set a key as
          there is a chance to get the same number
          */
          key: Math.random().toString(),
          name: action.placeName,
          image: {
            uri: 'https://loremflickr.com/300/300'
          }
        })
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== action.key)
      };
    default:
      return state;
  }
};

export default reducer;
