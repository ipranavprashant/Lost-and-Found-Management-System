import React, { useState } from "react";
import axios from "axios";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const LostItems = (props) => {
  const { item } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userHostel, setUserHostel] = useState("");
  const [proofOfClaim, setProofOfClaim] = useState("");

  const boxStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
  };

  const btnStyle = {
    backgroundColor: "#0074D9",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };
  const btnStyleSubmit = {
    backgroundColor: "green",
    color: "white",
    padding: "8px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };

  const inputStyle = {
    width: "90%",
    height: "15px",
    marginBottom: "5px",
  };

  const imageStyle = {
    width: "100%",
    maxHeight: "500px",
    margin: "5px",
    maxWidth: "100%",
  };

  if (window.matchMedia("(min-width: 768px)").matches) {
    imageStyle.maxWidth = "40%";
  }

  const closeButtonStyle = {
    cursor: "pointer",
  };

  const handleHelp = () => {
    setIsModalOpen(true);
  };

  const handleClaim = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitHelp = async (_id) => {
    setIsLoading(true);

    try {
      const data = {
        helpername: userName,
        mobilenumber: userMobile,
        hostelname: userHostel,
        itemdetails: `${item.itemname} - ${item.itemdescription}`,
      };

      await axios.post(`${Base_URL}/helper`, data);
      alert(
        "Thank you for contributing to the growth of our community. We are temporarily taking this item off the portal, with the hope that your assistance may aid in returning it to its original owner."
      );
      await axios.delete(`${Base_URL}/item/${_id}`);
      closeModal();
      alert("Item has been successfully removed!");
    } catch (error) {
      console.error("Error submitting help:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitClaim = async (_id) => {
    setIsLoading(true);

    try {
      if (!proofOfClaim) {
        alert("Please provide proof of claim.");
        return;
      }

      const data = {
        claimantname: userName,
        mobilenumber: userMobile,
        hostelname: userHostel,
        proofofclaim: proofOfClaim,
        itemdetails: `${item.itemname} - ${item.itemdescription}`,
      };

      await axios.post(`${Base_URL}/claimant`, data);
      alert(
        'The item has been successfully claimed. Please ensure that you have not claimed someone else\'s item. If you have mistakenly done so, kindly resubmit it using the "found" option.'
      );
      await axios.delete(`${Base_URL}/item/${_id}`);
      closeModal();
      alert("Item has been successfully removed!");
    } catch (error) {
      console.error("Error submitting claim:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={boxStyle}>
      <div>
        <h2>Name: {item.itemname}</h2>
        <p>Description: {item.itemdescription}</p>
        <p>
          This item has been <b>{item.concerntype}</b>
        </p>
        {item.images && item.images.length > 0 && (
          <div>
            <p>Images:</p>
            {item.images.map((image, index) => (
              <img key={index} src={image} alt="png" style={imageStyle} />
            ))}
          </div>
        )}
      </div>
      <button
        onClick={item.concerntype === "lost" ? handleHelp : handleClaim}
        style={btnStyle}
      >
        {item.concerntype === "lost" ? "Help" : "Claim"}
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              style={closeButtonStyle}
              onClick={closeModal}
            >
              &times;
            </span>
            <h3>Enter Your Information</h3>
            <input
              type="text"
              placeholder="Name"
              style={inputStyle}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              style={inputStyle}
              value={userMobile}
              onChange={(e) => setUserMobile(e.target.value)}
            />
            <input
              type="text"
              placeholder="Hostel Name"
              style={inputStyle}
              value={userHostel}
              onChange={(e) => setUserHostel(e.target.value)}
            />
            {item.concerntype === "found" && (
              <input
                type="text"
                placeholder="Proof of Claim"
                style={inputStyle}
                value={proofOfClaim}
                onChange={(e) => setProofOfClaim(e.target.value)}
              />
            )}

            {isLoading ? (
              <Spinner />
            ) : (
              <button
                onClick={
                  item.concerntype === "lost"
                    ? () => handleSubmitHelp(item._id)
                    : () => handleSubmitClaim(item._id)
                }
                style={btnStyleSubmit}
              >
                {item.concerntype === "lost" ? "Submit Help" : "Submit Claim"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LostItems;
