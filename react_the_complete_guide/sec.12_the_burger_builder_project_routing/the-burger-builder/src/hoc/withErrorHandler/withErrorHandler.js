import React, { Component }from 'react';

import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedCompoent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render () {
      return (
        <>
          <Modal show={this.state.error} close={this.errorConfirmedHandler}>
            { this.state.error ? this.state.error.message : null }
          </Modal>
          <WrappedCompoent {...this.props} />
        </>
      );
    }
  }
}

export default withErrorHandler;
