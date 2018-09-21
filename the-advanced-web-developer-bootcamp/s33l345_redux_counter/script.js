/* jslint esnext: true */
/* global Redux, $ */


/****** REDUX SETUP *******/
//Initial state
const initialState = {
  count: 0
};

//Root reducer
const rootReducer = function(state = initialState, action){
  switch (action.type){ //INCREMENT and DECREMENT have different ways to create a new object
    case "INCREMENT":
      let newIncState = {...state};
      newIncState.count++;
      return newIncState;
    case "DECREMENT":
      let newDecState = Object.assign({}, state);
      newDecState.count--;
      return newDecState;
    default:
      return state;
  }
};

const store = Redux.createStore(rootReducer);


/***** JQUERY HANDLERS ******/

const pushChanges = function(){
  let currentState = store.getState();
  $("#counter").text(currentState.count);
};

$(document).ready(function(){
  pushChanges(); //When the document is loaded update the counter
  $("#increment").on("click",function(){
    store.dispatch({
      type: "INCREMENT"
    });
    pushChanges();
  });
  $("#decrement").on("click",function(){
    store.dispatch({
      type: "DECREMENT"
    });
    pushChanges();
  });
});


