import React from 'react';

/*Note the paremeter passed as {color} is a destructuring of the parmaeter props (which contains
 color). This is a commonly pattern use in react instad using props.color along the code */
const Box = ({color}) => {
  const style = {
    width: '180px',
    height: '180px',
    display: 'block', //inline-block shows a whiteline at the bottom use display + float instead
    float: 'left',
    backgroundColor: color //If props were passed we would use props.color instead
  }
  return <div style={style} />;
};

export default Box
