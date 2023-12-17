import React, { useState } from "react";
import axios from "axios";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const DisplayPersonalItems = (props) => {
  const { item } = props;

  const containerStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
  };

  const contentStyle = {
    marginBottom: "10px",
  };

  const imageStyle = {
    width: "100%",
    maxHeight: "500px",
    margin: "5px",
    maxWidth: "100%",
  };

  const largerScreenMediaQuery = window.matchMedia("(min-width: 768px)");

  if (largerScreenMediaQuery.matches) {
    imageStyle.maxWidth = "40%";
  } else {
    imageStyle.maxWidth = "100%";
  }

  const btnStyle = {
    backgroundColor: "#0074D9",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleResolve = async (_id) => {
    setIsLoading(true);

    try {
      await axios.delete(`${Base_URL}/item/${_id}`, { withCredentials: true });
      alert("Item has been successfully removed!");
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h2>Name: {item.itemname}</h2>
        <p>Description: {item.itemdescription}</p>
        <p>
          This item has been <b>{item.concerntype}</b>
        </p>
      </div>

      {item.images && item.images.length > 0 && (
        <div>
          <p>Images:</p>
          {item.images.map((image, index) => (
            <img key={index} src={image} alt="png" style={imageStyle} />
          ))}
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <button onClick={() => handleResolve(item._id)} style={btnStyle}>
          Resolved
        </button>
      )}
    </div>
  );
};

export default DisplayPersonalItems;
