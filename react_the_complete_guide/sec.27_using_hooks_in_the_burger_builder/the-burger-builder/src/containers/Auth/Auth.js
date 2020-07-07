import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { validate } from '../../helpers/utility';
import * as actions from '../../store/actions'

import classes from './Auth.module.css';

const Auth = props => {
  const {
    onAuth,
    isAuth,
    isBuildingBurger,
    redirectPath,
    onSetAuthRedirectPath,
    loading,
    error
  } = props;
  const [authForm, setAuthForm ] = useState({
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
    }
  });
  const [isFormValid, setFormValid ] = useState(false);
  const [isSignUp, setSignUp ] = useState(false);

  const submitHandler = ( event ) => {
    event.preventDefault();

    const submitInfo = {};
    for (let field in authForm) {
      submitInfo[field] = authForm[field].value;
    }
    onAuth(submitInfo.email,submitInfo.password, isSignUp);
  }

  const switchAuthModeHandler = () => {
    setSignUp(prevState => !prevState);
  }

  const inputchangedHandler = (event, key) => {
    const { value } = event.target;
    const inputField = authForm[key];
    const newAuthForm = {
      ...authForm,
    }
    newAuthForm[key] = {
      ...inputField,
      value,
      valid: validate(value, inputField.validation)
    }
    // Check if all form is valid
    let newIsFormValid = true;
    for (let key in newAuthForm){
      newIsFormValid = newAuthForm[key].valid && newIsFormValid;
    }
    //Update formIsvalid and orderForm[key]
    setAuthForm(newAuthForm);
    setFormValid(newIsFormValid);
  }

  useEffect(() => {
    if (!isBuildingBurger && redirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  },[isBuildingBurger, redirectPath, onSetAuthRedirectPath]);

  if (isAuth) return <Redirect to={redirectPath} />
  let content;
  let signDisabled = !isFormValid;
  let switchDisabled = false;
  if (loading) {
    signDisabled = true;
    switchDisabled = true;
    content = <Spinner />;
  } else {
    if ( !loading ) {
      content = [];
      for (let key in authForm) {
        content.push(
          <Input
            key={key}
            type={authForm[key].type}
            value={authForm[key].value}
            config={authForm[key].config}
            invalid={!authForm[key].valid}
            invalidMsg={authForm[key].invalidMsg}
            onChange={(event) => inputchangedHandler(event,key)}
          />
        );
      }
    }
  }

  return (
    <div className={classes.Auth}>
      <h2>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h2>
      {error ? error.message : null}
      <form onSubmit={submitHandler}>
        {content}
        <Button type="Success" disabled={signDisabled}>
          SUBMIT
        </Button>
      </form>
      <Button onClick={switchAuthModeHandler} type="Danger" disabled={switchDisabled}>
        SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </div>
  );
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
