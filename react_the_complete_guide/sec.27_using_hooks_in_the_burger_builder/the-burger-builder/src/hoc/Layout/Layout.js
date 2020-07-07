import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [ isSideDrawerVisible, setSideDrawerVisible ] = useState(false)

  const sideDrawerClosedHandler = () =>{
    setSideDrawerVisible(false);
  }

  const sideDrawerTogglerHandler = () => {
    setSideDrawerVisible(prevState =>!prevState);
  }

  return (
    <>
      <Toolbar
        isAuth={props.isAuth}
        drawerTogglerClicked={sideDrawerTogglerHandler}/>
      <SideDrawer
        isAuth={props.isAuth}
        open={isSideDrawerVisible}
        closed={sideDrawerClosedHandler}/>
      <main className={classes.Content}>
        {props.children}
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  }
}
export default connect(mapStateToProps)(Layout);
