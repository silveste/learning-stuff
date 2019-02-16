import React from 'react';
import styles from './main.css';
//Note: emotion 10 is different, please see docs
import styled from 'react-emotion'
import { css } from 'emotion';

//react-emotion let create a component name to reuse inside render function
//and link styles direct into the component (see babelrc for config)
const Fancy = styled("h1")`
  color: ${props =>(props.wild ? "hotpink" : "gold")};
  font-size: 7rem;
`

//emotion uses template literals to create styles
const myColor = "#f00";
const myExampleStyle = css`
  color: ${myColor}
`

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }

  climb () {
    this.setState({
      count: this.state.count + 1
    });
  }

  render(){
    const isWild = this.state.count % 2 === 0;
    /*Div styles are applyied using css-loader, see webpack config*/
    /*h1 Styles are applyed using emotion*/
    /*Fancy Styles are applyed using react-emotion, see babelrc for config*/
    return(
      <div className={styles.counter} onClick={this.climb.bind(this)}>
        <h1 className={myExampleStyle}>Counting:</h1>
        <Fancy wild={isWild}>{this.state.count}</Fancy>
      </div>
    );
  }
}
