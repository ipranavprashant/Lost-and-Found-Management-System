import React from 'react';
import { Link } from 'react-router-dom';
import GroupInfo from './GroupInfo';
import Navbar from './Navbar';

const HomePage = () => {
  const containerStyle = {
    textAlign: 'center',
    marginTop: '10rem',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const paragraphStyle = {
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: '#0074D9',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  };

  const membersStyle = {
    marginTop: '8rem',
  };

  // Check if the user is already signed in using the authToken from local storage
  const authToken = localStorage.getItem('authToken');
  const isLoggedIn = authToken !== null;

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <h1 style={headingStyle}>
          Welcome to the Lost and Found Tracking System for NITC
        </h1>
        {/* Conditionally render based on authentication status */}
        {!isLoggedIn ? (
          <>
            <p style={paragraphStyle}>Please sign in to continue</p>
            <Link to="/sign-in">
              <button className="sign-in-button" style={buttonStyle}>
                Sign In
              </button>
            </Link>
          </>
        ) : <>
          <p style={paragraphStyle}>You can proceed to raising a concern</p>
          <Link to="/raise-a-concern">
            <button className="sign-in-button" style={buttonStyle}>
              Raise
            </button>
          </Link>
        </>
        }
        <div style={membersStyle}>
          <GroupInfo /> {/* Display the GroupInfo component here */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
