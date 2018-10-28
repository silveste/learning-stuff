import React from 'react';
import { Link } from 'react-router-dom';
import MessagesTimeLine from './MessagesTimeline';

const Homepage = ({currentUser}) => {
  if (!currentUser.isAuthenticated){
    return (
      <div className='home-hero'>
        <h1>What&apos;s Up?</h1>
        <h4>New to Warbler?</h4>
        <Link to='/signup' className='btn btn-primary'>
          Sing up here &raquo;
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <MessagesTimeLine
          profileImageUrl={currentUser.user.profileImageUrl}
          username={currentUser.user.username}
        />
      </div>
    );
  }

};

export default Homepage;
