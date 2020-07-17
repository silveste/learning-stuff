import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { validate } from '../../helpers/utility';
import * as actions from '../../store/actions'

import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        type: 'text',
        config: {
          placeholder: 'Mail Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        invalidMsg: 'Please enter a valid amail address',
        valid: true,
      },
      password: {
        type: 'password',
        config: {
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        invalidMsg: 'Password must have 6 characters minimum',
        valid: true,
      },
    },
    formIsValid: false,
    isSignUp: true
  }

  validateForm = (form) => {
    let isValid = true;

    const newForm = {
      ...form,
    }
    for (let key in newForm){
      const field = newForm[key];
      if (!validate(form[key].value, form[key].validation)) {
        newForm[key] = {
          ...field,
          valid: false,
        };
        isValid = false;
      }
    }
    return { controls: newForm, formIsValid: isValid };
  }

  submitHandler = ( event ) => {
    event.preventDefault();
    const { controls } = this.state;
    const newState = this.validateForm(controls);
    this.setState(newState);
    if (!newState.formIsValid) return;

    // If valid proceed to submit

    const submitInfo = {};
    for (let field in controls) {
      submitInfo[field] = controls[field].value;
    }
    this.props.onAuth(submitInfo.email,submitInfo.password, this.state.isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    })
  }

  inputchangedHandler = (event, key) => {
    const { value } = event.target;
    const { controls } = this.state;
    const inputField = controls[key];
    const newControls = {
      ...controls,
    }
    newControls[key] = {
      ...inputField,
      value,
      valid: validate(value, inputField.validation)
    }

    //Check if overall form is valid
    const { formIsValid } = this.validateForm(newControls);

    //Update formIsvalid and orderForm[key]
    this.setState({ controls: newControls, formIsValid });
  }

  componentDidMount () {
    if (!this.props.isBuildingBurger && this.props.redirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
  }

  render () {
    if (this.props.isAuth) return <Redirect to={this.props.redirectPath} />
    let content;
    let signDisabled = !this.state.formIsValid;
    let switchDisabled = false;
    if (this.props.loading) {
      signDisabled = true;
      switchDisabled = true;
      content = <Spinner />;
    } else {
      const { controls } = this.state;
      if ( !this.props.loading ) {
        content = [];
        for (let key in controls) {
          content.push(
            <Input
              key={key}
              type={controls[key].type}
              value={controls[key].value}
              config={controls[key].config}
              invalid={!controls[key].valid}
              invalidMsg={controls[key].invalidMsg}
              onChange={(event) => this.inputchangedHandler(event,key)}
            />
          );
        }
      }
    }

    return (
      <div className={classes.Auth}>
        <h2>{this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}</h2>
        {this.props.error ? this.props.error.message : null}
        <form onSubmit={this.submitHandler}>
          {content}
          <Button type="Success" disabled={signDisabled}>
            SUBMIT
          </Button>
        </form>
        <Button onClick={this.switchAuthModeHandler} type="Danger" disabled={switchDisabled}>
          SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    isBuildingBurger: state.burgerBuilder.building,
    redirectPath: state.auth.redirectPath
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email,password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
