import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayCardHelper from "./DisplayCardHelper";
import Navbar from "./Navbar";
import config from "./config";
import Spinner from "./Spinner"; // Import the Spinner component

const Base_URL = config.baseURL;

const HelperList = () => {
  const [helpers, setHelpers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHelpers();
  }, []);

  const fetchHelpers = async () => {
    try {
      const res = await axios.get(`${Base_URL}/helper`);
      setHelpers(res.data.gotHelper);
    } catch (error) {
      console.error("Error fetching helpers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Helpers List:</h1>
        {isLoading ? (
          <Spinner />
        ) : helpers.length === 0 ? (
          <p>*No helpers found*</p>
        ) : (
          helpers.map((helper, index) => (
            <DisplayCardHelper
              key={helper._id}
              helper={helper}
              number={index + 1}
            />
          ))
        )}
      </div>
    </>
  );
};

export default HelperList;
