import React, { useState } from 'react';
import './Signin.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
// const Base_URL="https://lostandfoundbackend-y9qs.onrender.com";
const Base_URL="http://localhost:5000";
function Signin() {

  const navigate = useNavigate();
  const handleNavigateToSignUp=()=>{
    navigate("/sign-up");
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    };
  
    try {
      const res = await axios.post(`${Base_URL}/login`, data, {
        withCredentials: true,
      });
  
      // Check the response status to determine if login was successful
      if (res.status === 401) {
        alert("Invalid Credentials");
      }
      else if(res.status === 500){
        alert("Internal Server Error");
      }
        console.log(res);
        // Assuming the server returns a token in the response
        const token = res.data.token;
  
        // Save the token securely (e.g., in a cookie or local storage)
        // Example using local storage (note: be cautious about security implications)
        localStorage.setItem('authToken', token);
  
        alert("Successfully signed in, you can now raise your concerns!");
        navigate("/home");
      } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };
  

  return (
    <>
    <Navbar />
    <div className="signin-container">
      <h2>Sign In</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
      </div>
      <div>
        <button className="btn-signin" onClick={handleSignIn} >
          Sign In
        </button>
        <p className='btn-spread'>Not a member?</p>
        <button className="btn-signin" onClick={handleNavigateToSignUp}>
          Sign Up
        </button>
      </div>
    </div>
    </>
  );
}

export default Signin;
