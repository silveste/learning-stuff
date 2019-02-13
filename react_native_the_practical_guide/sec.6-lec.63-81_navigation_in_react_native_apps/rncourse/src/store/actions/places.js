/*
This file  exports an action creator for places.
An action creator is a function that returns an object.
An action creator is the factory that returns actions objects
Every action needs to have at least a key called type where the value
is the action that will be performed.
*/

import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName) => {
  return {
    type: ADD_PLACE,
    placeName, //Using ES6 enhanced object literals to initialize key from variable with same name
  };
};

export const deletePlace = () => {
  return {
    type: DELETE_PLACE,
  };
};
