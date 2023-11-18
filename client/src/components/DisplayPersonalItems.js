import React from 'react';
import axios from 'axios';
import config from './config';

const Base_URL = config.baseURL;

const DisplayPersonalItems = (props) => {
  const { item } = props;

  const containerStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',  // Adjusted to stack content vertically
  };

  const contentStyle = {
    marginBottom: '10px',
  };

  //gem of a code to shorten image width based on responsiveness

  const imageStyle = {
    width: '100%',
    maxHeight: '500px',
    margin: '5px',
  };

  // Define a media query for larger screens
  const largerScreenMediaQuery = window.matchMedia('(min-width: 768px)');

  // Check if the screen matches the larger screen media query
  if (largerScreenMediaQuery.matches) {
    imageStyle.maxWidth = '40%';
  } else {
    imageStyle.maxWidth = '100%';
  }


  const btnStyle = {
    backgroundColor: '#0074D9',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  };

  const handleResolve = async (_id) => {
    try {
      await axios.delete(`${Base_URL}/item/${_id}`, { withCredentials: true });
      alert('Item has been successfully removed!');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h2>Name: {item.itemname}</h2>
        <p>Description: {item.itemdescription}</p>
        <p>This item has been <b>{item.concerntype}</b></p>
      </div>

      {/* Displaying Images */}
      {item.images && item.images.length > 0 && (
          <div>
          <p>Images:</p>
          {item.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="png"
              style={imageStyle}
            />
          ))}
        </div>
      )}

      <button onClick={() => handleResolve(item._id)} style={btnStyle}>
        Resolved
      </button>
    </div>
  );
};

export default DisplayPersonalItems;
