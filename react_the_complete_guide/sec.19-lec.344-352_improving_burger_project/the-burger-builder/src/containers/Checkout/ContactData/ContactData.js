import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { validate } from '../../../helpers/utility';
import * as actions from '../../../store/actions';

class ContactData extends Component {
  state = {
    orderForm: {
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
        valid: true,
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
        valid: true,
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
        valid: true,
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
        valid: true,
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
        valid: true,
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
        valid: true,
      },
    },
    formIsValid: false,
  }

  validateForm = (orderForm) => {
    let isValid = true;

    const newOrderForm = {
      ...orderForm,
    }
    for (let key in newOrderForm){
      const field = newOrderForm[key];
      if (!validate(orderForm[key].value, orderForm[key].validation)) {
        newOrderForm[key] = {
          ...field,
          valid: false,
        };
        isValid = false;
      }
    }

    return { orderForm: newOrderForm, formIsValid: isValid };
  }

  orderHandler = ( event ) => {
    event.preventDefault();
    const { orderForm } = this.state;
    const newState = this.validateForm(orderForm);
    this.setState(newState);
    if (!newState.formIsValid) return;

    // If valid proceed to submit

    const deliverInfo = {};
    for (let field in orderForm) {
      deliverInfo[field] = orderForm[field].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      deliverInfo,
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token);
  }

  inputchangedHandler = (event, key) => {
    const { value } = event.target;
    const { orderForm } = this.state;
    const inputField = orderForm[key];
    const newOrderForm = {
      ...orderForm,
    }
    newOrderForm[key] = {
      ...inputField,
      value,
      valid: validate(value, inputField.validation)
    }

    //Check if overall form is valid
    const { formIsValid } = this.validateForm(newOrderForm);

    //Update formIsvalid and orderForm[key]
    this.setState({ orderForm: newOrderForm, formIsValid });
  }

  render () {
    if (this.props.loading) return <Spinner />;
    const { orderForm } = this.state;
    const inputFields = [];
    for (let key in orderForm) {
      inputFields.push(
        <Input
          key={key}
          type={orderForm[key].type}
          value={orderForm[key].value}
          config={orderForm[key].config}
          invalid={!orderForm[key].valid}
          invalidMsg={orderForm[key].invalidMsg}
          onChange={(event) => this.inputchangedHandler(event,key)}
        />
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details:</h4>
        <form onSubmit={this.orderHandler}>
          {inputFields}
          <Button type="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
      </div>
    );
  }
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
