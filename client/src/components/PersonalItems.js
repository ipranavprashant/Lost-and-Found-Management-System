import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import DisplayPersonalItems from "./DisplayPersonalItems";
import { jwtDecode } from "jwt-decode";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const PersonalItems = (props) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          console.error("No authentication token found");
          return;
        }

        const decodedToken = decodeJwtToken(authToken);
        const userId = decodedToken.sub;

        const response = await axios.get(`${Base_URL}/item/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            withCredentials: true,
          },
        });

        setItems(response.data.gotItems);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const decodeJwtToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return null;
    }
  };

  const renderItem = (item) => {
    return <DisplayPersonalItems key={item._id} item={item} />;
  };

  const componentPadding = {
    padding: "10px",
  };

  return (
    <>
      <Navbar />
      <div style={componentPadding}>
        <h1>My Items {props.req}:</h1>
        <h3>
          *If your items ain't visible, make sure you raise a concern before.*
        </h3>
        {isLoading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <p>No lost or found items found</p>
        ) : (
          items.map((item) => renderItem(item))
        )}
      </div>
    </>
  );
};

export default PersonalItems;
