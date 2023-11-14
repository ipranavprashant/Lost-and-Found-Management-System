import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import LostFoundItems from './LostFoundItems';
import LostItems from './LostItems';
import FoundItems from './FoundItems';
// const Base_URL="https://lostandfoundbackend-y9qs.onrender.com";
const Base_URL="http://localhost:5000";
const LostAndFoundList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${Base_URL}/item`);
      console.log(res);
      setItems(res.data.gotItem);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  const renderItem = (item) => {
    if (props.req === 'lost') {
      return <LostItems key={item._id} item={item} />;
    } else if (props.req === 'found') {
      return <FoundItems key={item._id} item={item} />;
    } else {
      // Render default component (LostFoundItem or a custom one)
      // return renderLostAndFoundItem(item);
      return <LostFoundItems key={item._id} item={item} />;
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <h1>Items {props.req}:</h1>
        <h3>*If your items ain't visible, make sure you raise a concern before.*</h3>
        {items.length === 0 ? (
          <p>No lost or found items found</p>
        ) : (
          items.map((item) => renderItem(item))
        )}
      </div>
    </>
  );
};

export default LostAndFoundList;
