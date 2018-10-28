import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment'; //Library that handles with times and dates
import { Link } from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.jpg';

const MessageItem = ({date, profileImageUrl, text, username, removeMessage, isCorrectUser }) => (
  <div>
    <li className="list-group-item">
      <img
        src={profileImageUrl || DefaultProfileImg}
        alt={username}
        height="100"
        width="100"
        className="timeline-image"
      />
      <div className="message-area">
        <Link to="/">@{username} &nbsp;</Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YY">
            {date}
          </Moment>
        </span>
        <p>{text}</p>
        {isCorrectUser && <a className="btn btn-danger" onClick={removeMessage}>Delete</a>}
      </div>
    </li>
  </div>
);

export default MessageItem;

MessageItem.propTypes = {
  date: PropTypes.string,
  profileImageUrl: PropTypes.string,
  text: PropTypes.string,
  username: PropTypes.string,
  isCorrectUser: PropTypes.bool,
  removeMessage: PropTypes.func
};
