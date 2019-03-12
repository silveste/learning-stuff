/*
This file  exports an action creator for places.
An action creator is a function that returns an object.
An action creator is the factory that returns actions objects
Every action needs to have at least a key called type where the value
is the action that will be performed.
*/

import { SET_PLACES, DELETE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, getAuthToken } from './index';

// To return a function instad an object thunk is required
// see comments on configureStore.js
export const addPlace = (placeName, location, image) => (dispatch) => {
  let authToken;
  return dispatch(getAuthToken())
    .then((token) => {
      authToken = token;
      dispatch(uiStartLoading());
      return fetch('https://us-central1-rncourse-d2df3.cloudfunctions.net/saveImage', {
        method: 'POST',
        body: JSON.stringify({
          image: image.base64
        }),
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    })
    .catch((err) => {
      console.log(err);
      alert('Ups something went wrong! Please try again, IMAge');
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then((parsedRes) => {
      const placeData = {
        placeName,
        location,
        image: parsedRes.imageUrl
      };
      return fetch(`https://rncourse-d2df3.firebaseio.com/places.json?auth=${authToken}`, {
        method: 'POST',
        body: JSON.stringify(placeData)
      });
    })
  // Remember!!! Catch only capture failed network connections,
  // it won't catch 4XX and 5XX error codes
    .then(res => res.json())
    .then((parsedRes) => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
    })
    .catch((err) => {
      console.log(err);
      alert(`Ups something went wrong! Please try again, AuthToken: ${authToken}`);
      dispatch(uiStopLoading());
    });
};


export const getPlaces = () => (dispatch) => {
  dispatch(getAuthToken())
    .then(token => fetch(`https://rncourse-d2df3.firebaseio.com/places.json?auth=${token}`))
    .then(res => res.json())
    .then((parsedRes) => {
      const places = Object.keys(parsedRes).map(val => ({
        ...parsedRes[val],
        image: { uri: parsedRes[val].image },
        key: val
      }));
      dispatch(setPlaces(places));
    })
    .catch((err) => {
      alert('Something went wrong!!');
      console.log(err);
    });
};

export const deletePlace = key => dispatch => dispatch(getAuthToken())
  .then(token => fetch(`https://rncourse-d2df3.firebaseio.com/places/${key}.json?auth=${token}`, {
    method: 'DELETE',
  }))
  .then(res => res.json())
  .then((parsedRes) => {
    console.log(parsedRes);
    dispatch(deleteStorePlace(key));
  })
  .catch((err) => {
    alert('Something went wrong!!, Place not deleted');
    console.log(err);
  });

export const deleteStorePlace = key => ({
  type: DELETE_PLACE,
  key
});

export const setPlaces = places => ({
  type: SET_PLACES,
  places
});
