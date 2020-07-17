import React from 'react';

import selectors from './Person.css';

const person = ( props ) => {
    // Code throw random error to test Error boundaries
    const rnd = Math.random();
    if (rnd > 0.7) {
      throw new Error(`Something went wrong!. RND: ${rnd}`)
    };
    return (
        <div className={selectors.person}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
};

export default person;
