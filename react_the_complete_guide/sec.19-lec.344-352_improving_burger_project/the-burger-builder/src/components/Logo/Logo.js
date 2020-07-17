import React from 'react';

import logoImg from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={logoImg} alt="The Burger Builder"/>
  </div>
);

export default logo;
