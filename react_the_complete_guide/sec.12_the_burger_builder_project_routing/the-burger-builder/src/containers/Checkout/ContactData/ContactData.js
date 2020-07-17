import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Silveste',
        address: {
          street: 'My house 1',
          zipCode: '123456',
          country: 'Somewhere'
        },
        emailAdress: 'test@test.com',
        deliveryMethod: 'xxxx'
      }
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

  render () {
    if (this.state.loading) return <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details:</h4>
        <form action="">
          <input type="text" name='name' placeholder='Your Name'/>
          <input type="email" name='email' placeholder='Your Email'/>
          <input type="text" name='street' placeholder='Your Street'/>
          <input type="text" name='post' placeholder='Your Postal Code'/>
          <Button type="Success" onClick={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
