import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import DisplayCardClaimer from './DisplayCardClaimer';
import Navbar from './Navbar';

const Base_URL="https://lostandfoundbackend-y9qs.onrender.com";
// const Base_URL = "http://localhost:5000";

const ClaimantList = () => {
  const [claimants, setClaimants] = useState([]);

  useEffect(() => {
    fetchClaimants();
  }, [])

  const fetchClaimants = async () => {
    //fetch the notes
    const res = await axios.get(`${Base_URL}/claimant`);
    console.log(res);

    //set to state
    setClaimants(res.data.gotClaimant);
  }

  return (
    <>
      <Navbar />
      <div>
        <h1>Claimants List:</h1>
        {/* <h3>*These are the claimants of our claimants*</h3> */}
        {claimants.length === 0 ? (
          <p>No claimants found</p>
        ) : (
          claimants.map((claimant, index) => <DisplayCardClaimer key={claimant._id} claimant={claimant} number={index + 1} />)
        )}
      </div>
    </>
  );
};

export default ClaimantList;
