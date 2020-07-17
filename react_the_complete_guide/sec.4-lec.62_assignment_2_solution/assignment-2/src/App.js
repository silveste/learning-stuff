import React, { Component } from 'react';
import './App.css';
import Input from './Input/Input';
import CharComponent from './CharComponent/CharComponent';
import ValidationComponent from './ValidationComponent/ValidationComponent';
class App extends Component {
  state = {
    chars: [
      {key: Math.floor(Math.random()*16777215).toString(16), char: 'a'},
      {key: Math.floor(Math.random()*16777215).toString(16), char: 'b'},
      {key: Math.floor(Math.random()*16777215).toString(16), char: 'c'},

    ]
  }

  inputHandler = (text) => {
    const textArr = text.split('');
    const chars = textArr.map(char => {
      return {
        key: Math.floor(Math.random()*16777215).toString(16),
        char
      }
    });
    this.setState({chars});
  }

  removeCharHandler = (index) => {
    const { chars } = this.state;
    const newChars = chars.reduce((acc, val, i) => {
      if (index !== i) {
        acc.push({...val});
      }
      return acc;
    }, []);
    this.setState({chars: newChars});
  }

  render() {
    const { chars } = this.state;
    const value = chars.reduce((acc, val) => acc += val.char, '');
    const charComponents = chars.map((char, i) => (
      <CharComponent
        key={char.key}
        bgColor={`#${char.key}`}
        click={() => this.removeCharHandler(i)}
      >{char.char}</CharComponent>
    ));
    const charContainerStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'stretch',
      height: '4rem'
    }
    return (
      <div className='App'>
        <Input onChange={this.inputHandler} value={value}/>
        <ValidationComponent length={chars.length}/>
        <div style={charContainerStyle}>
          {charComponents}
        </div>
      </div>
    );
  }
}

export default App;
