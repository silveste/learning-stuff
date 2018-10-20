import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AuthForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      profileImageUrl: ''
    };
  }
  //By using a variable assigned to an arrow function we avoid bind the
  //function to this in the constructor: this.handlechange = this.handleChange.bind(this) IS NOT NECCESSARY
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const authType = this.props.signUp ? 'signup' : 'signin';
    this.props.onAuth(authType, this.state).then(() =>{
      console.log('Logged In');
    });
  }
  render(){
    const { email, username, password, profileImageUrl } = this.state;
    const { heading, buttonText, signUp } = this.props;
    return(
      <div className="row justify-content-md-center text-center">
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <h2>{heading}</h2>
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              id="email"
              name="email"
              onChange={this.handleChange}
              value={email}
              type="text"
            />
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              id="password"
              name="password"
              onChange={this.handleChange}
              value={password}
              type="password"
            />
            {signUp && (
              <div>
                <label htmlFor="username">User Name:</label>
                <input
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                  type="text"
                />
                <label htmlFor="image-url">Image URL:</label>
                <input
                  className="form-control"
                  id="image-url"
                  name="profileImageUrl"
                  onChange={this.handleChange}
                  value={profileImageUrl}
                  type="text"
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AuthForm.propTypes = {
  heading: PropTypes.string,
  buttonText: PropTypes.string,
  signUp: PropTypes.bool,
  onAuth: PropTypes.func,
};
