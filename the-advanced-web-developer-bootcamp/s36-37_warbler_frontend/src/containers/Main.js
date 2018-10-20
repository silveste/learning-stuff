//Container responsible for the routing logic
import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import { connect} from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import {authUser} from '../store/actions/auth';

const Main = props => {
  const { authUser } = props;
  return (
    <div className="container">
      <Switch>
        {/*exact path ensures that the route only trigger with that exact path*/}
        <Route exact path='/' render={props => <Homepage {...props} />} />
        <Route exact path='/signin' render={props => {
          return(
            <AuthForm
              onAuth={authUser}
              buttonText='Log in'
              heading='Welcome Back.'
              {...props}
            />
          );
        }} />
        <Route exact path='/signup' render={props => {
          return(
            <AuthForm
              onAuth={authUser}
              signUp
              buttonText='Sign me up!'
              heading='Join Warbler Today.'
              {...props}
            />
          );
        }} />
      </Switch>
    </div>
  );
};

function mapStateToProps(state){
  return {
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, { authUser })(Main));
