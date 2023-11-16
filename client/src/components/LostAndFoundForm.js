import React, { useState, useEffect } from 'react';
import './LostAndFoundForm.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Base_URL = "https://lostandfoundbackend-y9qs.onrender.com";
// const Base_URL = "http://localhost:5000";

function LostAndFoundForm() {
  const [userId, setUserId] = useState(null);

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

        // Check if userId is present in the decoded token
        if (!decodedToken || !decodedToken.userId) {
          console.error('Invalid or missing userId in the token');
          return;
        }

        console.log('decodedToken:', decodedToken);
        const userId = decodedToken.sub;
        setUserId(decodedToken.sub);
        console.log(userId);

        // Replace 'your-api-endpoint' with the actual endpoint for fetching user details
        const response = await axios.get(`${Base_URL}/fetchuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            withCredentials: true,
          },
        });

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
  const navigate = useNavigate();
  const [itemname, setItemName] = useState('');
  const [itemdescription, setItemDescription] = useState('');
  const [concerntype, setConcernType] = useState('lost');

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemDescriptionChange = (e) => {
    setItemDescription(e.target.value);
  };

  const handleConcernTypeChange = (e) => {
    setConcernType(e.target.value);
  };

  const handleFileUpload = (e) => {
    // Handle file upload logic if needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object to send to the backend
    const data = {
      itemname: itemname,
      itemdescription: itemdescription,
      concerntype: concerntype,
    };

    try {
      // Make API calls with the withCredentials option
      await axios.post(`${Base_URL}/item/${userId}`, data);
      // await axios.post(`${Base_URL}/personalitem`, data, { withCredentials: true });

      // Reset the form fields after successful submission
      setItemName('');
      setItemDescription('');
      setConcernType('lost');

      // Show a success alert
      alert("Item has been added successfully");

      // Navigate to the desired page
      navigate("/all-items/lost");
    } catch (error) {
      console.error('Error submitting item:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="lost-and-found-form">
        <h2>Report Lost or Found Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemname">Item Name:</label>
            <input
              type="text"
              id="itemname"
              name="itemname"
              value={itemname}
              onChange={handleItemNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="itemdescription">Item Description:</label>
            <textarea
              id="itemdescription"
              name="itemdescription"
              value={itemdescription}
              onChange={handleItemDescriptionChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="concerntype">Concern Type:</label>
            <select
              id="concerntype"
              name="concerntype"
              value={concerntype}
              onChange={handleConcernTypeChange}
              className='form-group1'
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="proofPhotos">Proof Photos:</label>
            <input
              type="file"
              id="proofPhotos"
              name="proofPhotos"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
            />
          </div>
          <button className="submit-button" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default LostAndFoundForm;
