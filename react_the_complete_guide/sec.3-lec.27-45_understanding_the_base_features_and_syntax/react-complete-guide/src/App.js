import React, { Component } from 'react';
import './App.css';
import AppOldStyle from './AppOldStyle/AppOldStyle';
import AppHooks from './AppHooks/AppHooks';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>React App Old Style</h1>
        <AppOldStyle/>
        <h1>React App Hooks</h1>
        <AppHooks/>
      </div>
    );
  }
}

export default App;
