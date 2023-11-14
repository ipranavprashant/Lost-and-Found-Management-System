import React, { useState } from 'react';
import './LostAndFoundForm.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from "axios";
// const Base_URL="https://lostandfoundbackend-y9qs.onrender.com";
const Base_URL="http://localhost:5000";
function LostAndFoundForm() {

  const navigate = useNavigate();
  const [itemname, setItemName] = useState('');
  const [itemdescription, setItemDescription] = useState('');
  const [concerntype, setConcernType] = useState('lost');

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemDescriptionChange = (e) => {
    setItemDescription(e.target.value);
  };

  const handleConcernTypeChange = (e) => {
    setConcernType(e.target.value);
  };

  const handleFileUpload = (e) => {
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object to send to the backend
    const data = {
      itemname: itemname,
      itemdescription: itemdescription,
      concerntype: concerntype,

    };

    const res=await axios.post(`${Base_URL}/item`,data); //you can use this res obj to update the items array there and then instead of refreshing
    const res1=await axios.post(`${Base_URL}/personalitem`,data); //you can use this res obj to update the items array there and then instead of refreshing  
    // window.location.reload();
    //setCreateForm

    // Reset the form fields after submission
    setItemName('');
    setItemDescription('');
    setConcernType('lost');
    alert("Item has been added successfully")
    navigate("/all-items/lost");
  };

  return (
    <>
    <Navbar />
    <div className="lost-and-found-form">
      <h2>Report Lost or Found Item</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="itemname">Item Name:</label>
          <input
            type="text"
            id="itemname"
            name="itemname"
            value={itemname}
            onChange={handleItemNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemdescription">Item Description:</label>
          <textarea
            id="itemdescription"
            name="itemdescription"
            value={itemdescription}
            onChange={handleItemDescriptionChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="concerntype">Concern Type:</label>
          <select
            id="concerntype"
            name="concerntype"
            value={concerntype}
            onChange={handleConcernTypeChange}
            className='form-group1'
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="proofPhotos">Proof Photos:</label>
          <input
            type="file"
            id="proofPhotos"
            name="proofPhotos"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
        </div>
        <button className="submit-button" type="submit"  onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
    </>
  );
}

export default LostAndFoundForm;
