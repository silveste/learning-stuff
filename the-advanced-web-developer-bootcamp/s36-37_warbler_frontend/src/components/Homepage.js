import React from 'react';
import { Link } from 'react-router-dom';

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
    return (<h1>YUHUUUU!!!!</h1>);
  }

};

export default Homepage;
