import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCardHelper from './DisplayCardHelper';
import Navbar from './Navbar';
const Base_URL = "https://lostandfoundbackend-y9qs.onrender.com";
// const Base_URL = "http://localhost:5000";

const HelperList = () => {

  const [helpers, setHelpers] = useState([]);

  useEffect(() => {
    fetchHelpers();
  }, []);

  const fetchHelpers = async () => {
    try {
      const res = await axios.get(`${Base_URL}/helper`);
      setHelpers(res.data.gotHelper);
    } catch (error) {
      console.error('Error fetching helpers:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Helpers List:</h1>
        {helpers.length === 0 ? (
          <p>*No helpers found*</p>
        ) : (
          helpers.map((helper, index) => (
            <DisplayCardHelper key={helper._id} helper={helper} number={index + 1} />
          ))
        )}
      </div>
    </>
  );
};

export default HelperList;
