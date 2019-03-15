import {
  UI_START_LOADING,
  UI_STOP_LOADING,
  UI_SHOW_SHARE_PLACES,
  UI_SHOW_FIND_PLACES
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  NavigatorTab: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case UI_SHOW_SHARE_PLACES:
      return {
        ...state,
        NavigatorTab: 1
      };
    case UI_SHOW_FIND_PLACES:
      return {
        ...state,
        NavigatorTab: 0
      };
    default:
      return state;
  }
};

export default reducer;
