import React from 'react';

export default (props) => {
  const style = {
    display: 'inline-block',
    backgroundColor: props.bgColor,
    padding: '0.2rem',
    height: '100%',
    lineHeight: '4rem',
    fontSize: '4rem',
    color: '#fff',
    textShadow: '1px 1px #0003'
  }

  if (props.children === ' ') {
    style.backgroundColor = '#fff';
    style.width = '2rem'
  }
  return (
    <span onClick={props.click} style={style}>{props.children}</span>
  );
}
