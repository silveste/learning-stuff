import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  const { show, close, children } = props;

  return (
    <>
      <Backdrop show={show} clicked={close}/>
      <div
        className={classes.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {children}
      </div>
    </>
  )
}

export default React.memo(Modal, ( prevProps, nextProps ) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);
//Component is only updated when second argument of memo return false
