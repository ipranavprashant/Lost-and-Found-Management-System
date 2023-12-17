import React from "react";

const DisplayCardHelper = ({ helper, number }) => {
  const { itemdetails, helpername, mobilenumber, hostelname, date } = helper;

  const cardStyle = {
    backgroundColor: "#e6f7ff",
    padding: "10px",
    margin: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={cardStyle}>
      <h2>Helper Details:</h2>
      <h2>No. {number}</h2>
      <p>
        <strong>Item helped for:</strong> {itemdetails}
      </p>
      <p>
        <strong>Helper Name:</strong> {helpername}
      </p>
      <p>
        <strong>Mobile Number:</strong> {mobilenumber}
      </p>
      <p>
        <strong>Hostel Name:</strong> {hostelname}
      </p>
      <p>
        <strong>Date:</strong> {new Date(date).toLocaleString()}
      </p>
    </div>
  );
};

export default DisplayCardHelper;
