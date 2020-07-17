import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

axios.interceptors.request.use(request => {
  console.log('Global request handler');
  //Do something
  return request;
}, error => {
  //handles (sending) axios errors globally
  console.log('Global request error handler');
  //Returns the error for local error handlers
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log('Global response handler');
  return response;
}, error => {
  console.error('global response error handler');
  console.error(error);
  return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
