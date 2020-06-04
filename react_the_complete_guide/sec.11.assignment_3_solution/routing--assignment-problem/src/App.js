import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import './App.css';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <nav className="main-nav">
              <ul>
                <li>
                  <NavLink to="/users">Users</NavLink>
                </li>
                <li>
                  <NavLink to="/courses">Courses</NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <Switch>
            <Route path="/courses" component={Courses} />
            <Route path="/users" component={Users} />
            <Redirect from="/all-courses" to="/courses" />
            {/* Any path different than /users or /courses is incorrect */}
            <Route path="/:error" render={props => {
              return (
                <div>
                  <h1>Error 404</h1>
                  <p>Incorrect path: /{props.match.params.error}</p>
                </div>
              )
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
