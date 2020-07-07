import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { validate } from '../../../helpers/utility';
import * as actions from '../../../store/actions';

const ContactData = props => {
  const [ orderForm, setOrderForm ] = useState({
    name: {
      type: 'text',
      config: {
        placeholder: 'Your Name',
      },
      value: '',
      validation: {
        required: true,
      },
      invalidMsg: 'Please enter your name',
      valid: null,
    },
    street: {
      type: 'text',
      config: {
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      invalidMsg: 'Your street is required',
      valid: null,
    },
    zipCode: {
      type: 'text',
      config: {
        placeholder: 'ZIP Code',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      invalidMsg: 'ZIP code is required and must be 5 characters length',
      valid: null,
    },
    country: {
      type: 'text',
      config: {
        placeholder: 'Country',
      },
      value: '',
      validation: {
        required: true,
      },
      invalidMsg: 'The Country is required',
      valid: null,
    },
    emailAdress: { //Using custom validator instead browser's
      type: 'text',
      config: {
        placeholder: 'Your Email Adress',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      invalidMsg: 'Please enter a valid email address',
      valid: null,
    },
    deliveryMethod: {
      type: 'select',
      config: {
        options: [
          {value: 'fastest', displayValue: 'Fastests'},
          {value: 'cheapest', displayValue: 'Cheapest'},
        ],
      },
      value: '',
      validation: {
        required: true
      },
      invalidMsg: 'Please choose an option',
      valid: null,
    },
  })
  const [isFromValid, setFormValid ] = useState(false);

  const orderHandler = ( event ) => {
    event.preventDefault();
    const deliverInfo = {};
    for (let field in orderForm) {
      deliverInfo[field] = orderForm[field].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      deliverInfo,
      userId: props.userId
    }
    props.onOrderBurger(order, props.token);
  }

  const inputchangedHandler = (event, key) => {
    const { value } = event.target;
    const inputField = orderForm[key];
    const newOrderForm = {
      ...orderForm,
    }
    newOrderForm[key] = {
      ...inputField,
      value,
      valid: validate(value, inputField.validation)
    }
    // Check if all form is valid
    let newIsFormValid = true;
    for (let key in newOrderForm){
      newIsFormValid = newOrderForm[key].valid && newIsFormValid;
    }
    //Update formIsvalid and orderForm[key]
    setOrderForm(newOrderForm);
    setFormValid(newIsFormValid);
  }

  if (props.loading) return <Spinner />;
  const inputFields = [];
  for (let key in orderForm) {
    inputFields.push(
      <Input
        key={key}
        type={orderForm[key].type}
        value={orderForm[key].value}
        config={orderForm[key].config}
        invalid={!orderForm[key].valid && orderForm[key].valid !== null} //if input === null user didn type there yet
        invalidMsg={orderForm[key].invalidMsg}
        onChange={(event) => inputchangedHandler(event,key)}
      />
    );
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact details:</h4>
      <form onSubmit={orderHandler}>
        {inputFields}
        <Button type="Success" disabled={!isFromValid}>ORDER</Button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
