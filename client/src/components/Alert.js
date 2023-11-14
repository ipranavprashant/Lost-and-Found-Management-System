import React from 'react';

const Alert = ({ type, message }) => {
  const alertStyle = {
    backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  };

  return (
    <div style={alertStyle}>
      {message}
    </div>
  );
};

export default Alert;
