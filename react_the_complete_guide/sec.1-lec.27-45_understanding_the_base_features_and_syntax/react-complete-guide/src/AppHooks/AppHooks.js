import React, { useState } from 'react';
import Person from '../Person/Person';

export default (props) => {
  const [personState, setPersonState] = useState({
    persons: [
      { name: 'Toni', age: 50 },
      { name: 'Candela', age: 49 },
    ]
  });

  const switchAgeHandler = () => {
    setPersonState({
      persons: [
        { name: 'Toni', age: 20 },
        { name: 'Candela', age: 19 },
      ]
    })
  }

  return (
    <div>
      <button onClick={switchAgeHandler}>Correct Age</button>
      <Person name={personState.persons[0].name} age={personState.persons[0].age}/>
      <Person name={personState.persons[1].name} age={personState.persons[1].age}>I have no idea what react is</Person>
    </div>
  );
}
