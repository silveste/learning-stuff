import React, { Component } from 'react';
import Person from '../Person/Person';

class AppOldStyle extends Component {
  state = {
    showPersons: true,
    persons: [
      { name: 'Toni', age: 50, key: 'asfdewqfv'},
      { name: 'Candela', age: 49, key: 'fdsadsfdsads' },
    ]
  }

  togglePersonsHandler = () => {
    const { showPersons } = this.state;
    this.setState({ showPersons: !showPersons });
  }

  render() {
    const { showPersons, persons } = this.state;

    let personsContainer = null;

    if (showPersons){
      personsContainer = persons.map(person => (
        <Person
          name={person.name}
          age={person.age}
          key={person.key}
        />
      ));
    }

    return (
      <div>
        <button onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {personsContainer}
      </div>
    );
  }
}

export default AppOldStyle;
