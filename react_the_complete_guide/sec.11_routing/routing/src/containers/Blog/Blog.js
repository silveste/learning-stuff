import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'))

class Blog extends Component {

  render() {
    return (
      <div className = "Blog">
        <header>
          <nav>
            <ul>
              {/*
                To set an class name that aplies when the route is active use the NavLink props:
                To set styles using classes: activeClassName='my-class'
                To set styles using inline CSS: activeStyle={{cssLikeProperty: cssValue}}
              */}
              <li><NavLink exact to="/posts">Posts</NavLink></li>
              <li><NavLink to="/new-post">New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Using render prop of Route</h1>}*/}
        <Switch> {/*Switch tell the router to load only the first match that finds*/}
          <Route path="/new-post" component={AsyncNewPost} />
          <Route path="/posts" component={Posts} />
          <Redirect from="/" to="/posts"/>
        </Switch>
      </div>
    );
  }
}

export default Blog;
