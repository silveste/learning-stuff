import {
  UI_START_LOADING,
  UI_STOP_LOADING,
  UI_SHOW_SHARE_PLACES,
  UI_SHOW_FIND_PLACES
} from './actionTypes';

export const uiStartLoading = () => ({
  type: UI_START_LOADING
});
export const uiStopLoading = () => ({
  type: UI_STOP_LOADING
});

export const uiShowSharePlaces = () => ({
  type: UI_SHOW_SHARE_PLACES
});

export const uiShowFindPlaces = () => ({
  type: UI_SHOW_FIND_PLACES
});
