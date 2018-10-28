import { apiCall } from '../../services/api.js';
import { addError } from './errors';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionsTypes';

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const fetchMessages = () => {
  return dispatch => {
    return apiCall('GET', '/api/messages')
      .then( res => dispatch(loadMessages(res)))
      .catch(err => dispatch(addError(err.message)));
  };
};

export const postNewMessage = text => ( dispatch, getState ) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall('POST', `/api/users/${id}/messages`, { text })
    .then( () => {})
    .catch(err => dispatch(addError(err.message)));
};

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall('DELETE', `/api/users/${user_id}/messages/${message_id}`)
      .then( res => dispatch(remove(res._id)))
      .catch(err => dispatch(addError(err.message)));
  };
};
