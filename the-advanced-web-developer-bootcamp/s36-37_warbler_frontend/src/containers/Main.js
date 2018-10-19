//Container responsible for the routing logic
import React from 'react ';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import { connect} from 'react-redux';
import Homepage from '../components/Homepage';

const Main = props => {
  return (
    <div className="container">
      <Switch>
        {/*exact path ensures that the route only trigger with that exact path*/}
        <Route exact path='/' render={props => <Homepage {...props} />} />
      </Switch>
    </div>
  );
};

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(connect(mapStateToProps, null)(Main));
