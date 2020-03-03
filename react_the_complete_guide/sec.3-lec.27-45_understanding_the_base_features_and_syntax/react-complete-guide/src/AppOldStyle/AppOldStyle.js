import React, { Component } from 'react';
import Person from '../Person/Person';

class AppOldStyle extends Component {
  state = {
    persons: [
      { name: 'Toni', age: 50 },
      { name: 'Candela', age: 49 },
    ]
  }

  switchAgeHandler = () => {
    this.setState({
      persons: [
        { name: 'Toni', age: 20 },
        { name: 'Candela', age: 19 },
      ]
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.switchAgeHandler}>Correct Age</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>I have no idea what react is</Person>
      </div>
    );
  }
}

export default AppOldStyle;
