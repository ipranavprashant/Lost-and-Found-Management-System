import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GroupInfo from "./GroupInfo";
import Navbar from "./Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "./config";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";

const Base_URL = config.baseURL;

const HomePage = () => {
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Assuming you have a token stored in localStorage after user login
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          console.error("No authentication token found");
          return;
        }
        // console.log(authToken);
        // Decode the JWT token to get user information
        const decodedToken = decodeJwtToken(authToken);

        // console.log('decodedToken:', decodedToken);
        const userId = decodedToken.sub;
        // console.log(userId);

        // Replace 'your-api-endpoint' with the actual endpoint for fetching user details
        const response = await axios.get(`${Base_URL}/fetchuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            withCredentials: true,
          },
        });

        // Assuming the response contains user details with 'username' property
        setUserDetails(response);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const decodeJwtToken = (token) => {
    try {
      // Use jwtDecode to decode the JWT token
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return null;
    }
  };

  const containerStyle = {
    textAlign: "center",
    marginTop: "15rem",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const paragraphStyle = {
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: "#0074D9",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };

  const membersStyle = {
    marginTop: "8rem",
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <h1 style={headingStyle}>
          Welcome to the Lost and Found Tracking System
        </h1>
        {/* Conditionally render based on authentication status */}
        {!user || !userDetails ? (
          <>
            <p style={paragraphStyle}>Please sign in to continue</p>
            <Link to="/sign-in">
              <button className="sign-in-button" style={buttonStyle}>
                Sign In
              </button>
            </Link>
          </>
        ) : (
          <>
            <p style={paragraphStyle}>
              Welcome{" "}
              <b>
                {userDetails.data.gotUser.username}-(
                {userDetails.data.gotUser.rollno})
              </b>
              , proceed to raising a concern
            </p>
            <Link to="/raise-a-concern">
              <button className="sign-in-button" style={buttonStyle}>
                Raise
              </button>
            </Link>
          </>
        )}
        <div style={membersStyle}>
          <GroupInfo /> {/* Display the GroupInfo component here */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
