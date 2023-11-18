import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import DisplayPersonalItems from './DisplayPersonalItems';
import { jwtDecode } from 'jwt-decode';
import config from './config';

const Base_URL = config.baseURL;


const PersonalItems = (props) => {


  const [items, setItems] = useState([]);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Assuming you have a token stored in localStorage after user login
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          console.error('No authentication token found');
          return;
        }
        console.log(authToken);
        // Decode the JWT token to get user information
        const decodedToken = decodeJwtToken(authToken);

        console.log('decodedToken:', decodedToken);
        const userId = decodedToken.sub;
        console.log(userId);

        // Replace 'your-api-endpoint' with the actual endpoint for fetching user details
        const response = await axios.get(`${Base_URL}/item/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            withCredentials: true,
          },
        });

        // Assuming the response contains user details with 'username' property
        setItems(response.data.gotItems);
        console.log(response);

      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const decodeJwtToken = (token) => {
    try {
      // Use jwtDecode to decode the JWT token
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  };


  const renderItem = (item) => {
    return <DisplayPersonalItems key={item._id} item={item} />;
  };

  const componentPadding = {
    padding: '10px',
  };

  return (
    <>
      <Navbar />
      <div style={componentPadding}>
        <h1>My Items {props.req}:</h1>
        <h3>*If your items ain't visible, make sure you raise a concern before.*</h3>
        {items.length === 0 ? (
          <p>No lost or found items found</p>
        ) : (
          items.map((item) => renderItem(item))
        )}
      </div>
    </>
  );
};

export default PersonalItems;
