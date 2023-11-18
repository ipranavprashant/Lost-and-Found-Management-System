import React from 'react';

const GroupInfo = () => {
  const groupInfoStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '5px',
    position: 'fixed', // or 'absolute'
    bottom: 0,
    left: 0,
    width: '100%',
  };

  const groupTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const memberListStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const memberItemStyle = {
    margin: '10px 0',
  };

  return (
    <div style={groupInfoStyle}>
      <h2 style={groupTitleStyle}>Designed and implemented by:</h2>
      <ul style={memberListStyle}>
        <li style={memberItemStyle}>"Pranav Prashant" - <a href="mailto:ipranavprashant@gmail.com">ipranavprashant@gmail.com</a></li>
      </ul>
    </div>
  );
};

export default GroupInfo;
