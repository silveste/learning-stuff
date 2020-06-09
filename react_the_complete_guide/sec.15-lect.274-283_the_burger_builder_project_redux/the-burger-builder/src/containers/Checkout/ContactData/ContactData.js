import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

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
      emailAdress: {
        type: 'email',
        config: {
          placeholder: 'Your Email Adress',
        },
        value: '',
        validation: {
          required: true,
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
    loading: false,
  }

  validate = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.trim().length >=  rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <=  rules.maxLength && isValid;
    }
    return isValid;
  }

  orderHandler = ( event ) => {
    event.preventDefault();

    // Validate data
    let isValid = true;
    const { orderForm } = this.state;
    const newOrderForm = {
      ...orderForm,
    }
    for (let key in newOrderForm){
      const field = newOrderForm[key];
      if (!this.validate(orderForm[key].value, orderForm[key].validation)) {
        newOrderForm[key] = {
          ...field,
          valid: false,
        }
        isValid = false;
      }
    }

    //If not valid return and update state
    if (!isValid) {
      this.setState({ orderForm: newOrderForm, formIsValid: false });
      return;
    }

    // If valid proceed to submit
    this.setState({ loading: true });
    const deliverInfo = {};
    for (let field in orderForm) {
      deliverInfo[field] = orderForm[field].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      deliverInfo,
    }
    axios.post('/orders.json', order)
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e))
      .finally(() => {
        this.setState({ loading: false })
        this.props.history.push('/');
      });
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
      valid: this.validate(value, inputField.validation)
    }

    //Check if overall form is valid
    let { formIsValid } = this.state;
    for (let field in orderForm) {
      formIsValid = orderForm[field].valid && orderForm[field].value !== '';
      if (!formIsValid) {
        break;
      }
    }

    this.setState({ orderForm: newOrderForm, formIsValid });
  }

  render () {
    if (this.state.loading) return <Spinner />;
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }

}
export default connect(mapStateToProps)(ContactData);
