import React from 'react';
import PropTypes from 'prop-types';
import defaultProfileImage from '../images/default-profile-image.jpg';


const UserAside = ({profileImageUrl, username}) => (
  <aside className="col-sm-2">
    <div className="panel panel-body">
      <img
        src={profileImageUrl}
        alt={username}
        className="img-thumbnail"
      />
    </div>
  </aside>
);


export default UserAside;

UserAside.defaultProps = {
  profileImageUrl: defaultProfileImage
};

UserAside.propTypes = {
  profileImageUrl: PropTypes.string.isRequired,
  username: PropTypes.string
};
