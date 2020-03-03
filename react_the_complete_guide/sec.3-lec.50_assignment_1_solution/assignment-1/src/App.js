import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
class App extends Component {
  state = {
    username: 'Toni'
  }

  userNameHandler = (name) => {
    this.setState({ username: name });
  }

  render() {
    return (
      <div className='App'>
        <UserInput onChange={this.userNameHandler} value={this.state.username}/>
        <UserOutput title='User Name'>{this.state.username}</UserOutput>
        <UserOutput title='Paragraph 1'>This is the paragraph 1</UserOutput>
        <UserOutput title='Paragraph 2'>This is the paragraph 2</UserOutput>
      </div>
    );
  }
}

export default App;
