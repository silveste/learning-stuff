import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postNewMessage } from '../store/actions/messages';

class MessageForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: ''
    };
  }

  handleMessage = event => {
    event.preventDefault();
    this.props.postNewMessage(this.state.message);
    this.setState({message: ''});
    this.props.history.push('/');
  }

  render(){
    return(
      <form onSubmit={ this.handleMessage }>
        {this.props.errors.message && (
          <div className="alert alert-danger">
            {this.props.errors.message}
          </div>
        )}
        <input
          type="text"
          className="form-control"
          onChange={e => this.setState({ message: e.target.value })}
        />
        <button type="submit" className="btn btn-success pull-right">
          Add my message!
        </button>
      </form>
    );
  }
}

function mapStateToProps(state){
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);

MessageForm.propTypes = {
  errors: PropTypes.object,
  postNewMessage: PropTypes.func,
  history: PropTypes.object
};
