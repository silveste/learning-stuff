import React from 'react';
import PropTypes from 'prop-types';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

const MessageTimeline = props => {
  return (
    <div className="row">
      <UserAside
        profileImsgeUrl={props.profileImageUrl}
        username ={props.username}
      />
      <MessageList />
    </div>
  );
};

export default MessageTimeline;

MessageTimeline.propTypes = {
  profileImageUrl: PropTypes.string,
  username: PropTypes.string
};
