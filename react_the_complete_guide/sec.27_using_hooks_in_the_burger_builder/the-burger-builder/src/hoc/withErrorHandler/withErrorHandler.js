import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/httpErrorHandler';

const withErrorHandler = (WrappedCompoent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal show={error} close={clearError}>
          { error ? error.message : null }
        </Modal>
        <WrappedCompoent {...props} />
      </>
    );
  }
}

export default withErrorHandler;
