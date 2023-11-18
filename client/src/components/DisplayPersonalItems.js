import React from 'react';
import axios from 'axios';
import config from './config';

const Base_URL = config.baseURL;

const DisplayPersonalItems = (props) => {
  const { item } = props;
  console.log(item);
  const boxStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

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
      // Include the withCredentials option for the delete request
      await axios.delete(`${Base_URL}/item/${_id}`, { withCredentials: true });
      alert('Item has been successfully removed!');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div style={boxStyle}>
      <div>
        <h2>Name: {item.itemname}</h2>
        <p>Description: {item.itemdescription}</p>
        <p>This item has been <b>{item.concerntype}</b></p>
        
        {/* Displaying Images */}
        {item.images && item.images.length > 0 && (
          <div>
            <p>Images:</p>
            {item.images.map((image, index) => (
              <img key={index} src={image} alt="png" style={{ maxWidth: '500px', maxHeight: '500px', margin: '5px' }} />
            ))}
          </div>
        )}
      </div>
      <div>
        <button onClick={() => handleResolve(item._id)} style={btnStyle}>
          Resolved
        </button>
      </div>
    </div>
  );
};

export default DisplayPersonalItems;
