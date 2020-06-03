import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' >This is a link</NavigationItem>
    <NavigationItem link='/' active>This is a link</NavigationItem>
    <NavigationItem link='/' >This is a link</NavigationItem>
  </ul>
);

export default navigationItems;
