import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from '../actions/actionTypes';

const initialState = {
  places: [],
  selectedPlace: null
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
          key: Math.random(),
          name: action.placeName,
          image: {
            uri: 'https://loremflickr.com/300/300'
          }
        })
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.key !== state.selectedPlace.key),
        selectedPlace: null
      };
    case SELECT_PLACE:
      return {
        ...state,
        selectedPlace: state.places.find(place => place.key === action.placeKey)
      };
    case DESELECT_PLACE:
      return {
        ...state,
        selectedPlace: null
      };
    default:
      return state;
  }
};

export default reducer;
