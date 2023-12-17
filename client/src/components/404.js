import React from "react";
import "./404.css";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="not-found">
        <h1 className="Error-404">Error-404 :(</h1>
        <p className="error-404-content">
          Oops! The page you're looking for could not be found.
        </p>
        <NavLink to="/">
          <button className="back-to-home">Back to Home</button>
        </NavLink>
      </div>
    </>
  );
};

export default NotFound;
