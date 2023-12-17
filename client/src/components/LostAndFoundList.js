import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import LostFoundItems from "./LostFoundItems";
import LostItems from "./LostItems";
import FoundItems from "./FoundItems";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const LostAndFoundList = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${Base_URL}/item`);
      console.log(res);
      setItems(res.data.gotItem);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = (item) => {
    if (props.req === "lost") {
      return <LostItems key={item._id} item={item} />;
    } else if (props.req === "found") {
      return <FoundItems key={item._id} item={item} />;
    } else {
      return <LostFoundItems key={item._id} item={item} />;
    }
  };

  const componentPadding = {
    padding: "10px",
  };

  return (
    <>
      <Navbar />
      <div style={componentPadding}>
        <h1>Items {props.req}:</h1>
        <h3>
          *If your items ain't visible, make sure you raise a concern before.*
        </h3>
        {loading ? (
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

export default LostAndFoundList;
