import React from "react";

const DisplayCardClaimer = ({ claimant, number }) => {
  const {
    itemdetails,
    claimantname,
    mobilenumber,
    hostelname,
    proofofclaim,
    date,
  } = claimant;

  const cardStyle = {
    backgroundColor: "#e6f7ff",
    padding: "10px",
    margin: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={cardStyle}>
      <h2>Claimant Details:</h2>
      <h2>No. {number}</h2>
      <p>
        <strong>Claimant Name:</strong> {claimantname}
      </p>
      <p>
        <strong>Item Claimed:</strong> {itemdetails}
      </p>
      <p>
        <strong>Mobile Number:</strong> {mobilenumber}
      </p>
      <p>
        <strong>Hostel Name:</strong> {hostelname}
      </p>
      <p>
        <strong>Proof of Claim:</strong> {proofofclaim}
      </p>
      <p>
        <strong>Date:</strong> {new Date(date).toLocaleString()}
      </p>
    </div>
  );
};

export default DisplayCardClaimer;
