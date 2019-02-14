import React from 'react';
import reactDOM from 'react-dom';
import Counter from './counter';
//Allows to wrap the aplication and hot reload without loosing the state
import { AppContainer } from 'react-hot-loader';

function render(Component){
  reactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("react-root")
  )
}


render(Counter);

//Allows  hot reloading when there are changes
if (module.hot) {
  //If the modul's name comes from counter.js is accepted and the function in the 2nd parmaeter run
  module.hot.accept('./counter.js'), () => {
    const NewCounter = require('./counter.js').default;
    render(NewCounter);
  }
}
