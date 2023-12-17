import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayCardClaimer from "./DisplayCardClaimer";
import Navbar from "./Navbar";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const ClaimantList = () => {
  const [claimants, setClaimants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClaimants();
  }, []);

  const fetchClaimants = async () => {
    try {
      const res = await axios.get(`${Base_URL}/claimant`);
      setClaimants(res.data.gotClaimant);
    } catch (error) {
      console.error("Error fetching claimants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Claimants List:</h1>
        {isLoading ? (
          <Spinner />
        ) : claimants.length === 0 ? (
          <p>No claimants found</p>
        ) : (
          claimants.map((claimant, index) => (
            <DisplayCardClaimer
              key={claimant._id}
              claimant={claimant}
              number={index + 1}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ClaimantList;
