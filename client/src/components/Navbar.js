import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // const user = localStorage.getItem("authToken");

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    // localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/home").then(() => {
      // window.location.reload(true);
      // alert("Successfully logged out");
    });
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.matchMedia("(max-width: 1000px)").matches);
    };

    // Check screen size on mount
    checkScreenSize();

    // Add event listener for changes in screen size
    window.addEventListener("resize", checkScreenSize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const navbarStyle = {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0077B6",
    color: "white",
    padding: "10px 20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    height: "50px",
    margin: "auto",
  };

  const linkContainerStyle = {
    display: !isSmallScreen ? "flex" : "none",
    justifyContent: "center",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    margin: isSmallScreen ? "10px 0" : "10px 50px",
    transition: "color 0.3s",
    display: isSmallScreen ? "block" : "inline-block",
  };

  const iconStyle = {
    cursor: "pointer",
    display: isSmallScreen ? "block" : "none",
    marginTop: "15px",
  };

  const menuStyle = {
    display: isSmallScreen ? (menuOpen ? "flex" : "none") : "none", // Updated condition
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    width: "90%",
    margin: "auto",
    top: "72px",
    left: "0",
    right: "0",
    backgroundColor: "#0077B6",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    zIndex: 1, // Ensure menu is on top
    transition: "0.5s ease-in-out",
  };

  return (
    <div style={navbarStyle}>
      <div>
        <div style={linkContainerStyle}>
          <Link to="/home" style={linkStyle}>
            Home
          </Link>
          {user && (
            <>
              <Link to="/my-items" style={linkStyle}>
                My Items
              </Link>
              <Link to="/all-items" style={linkStyle}>
                All Items
              </Link>
              <Link to="/all-items/lost" style={linkStyle}>
                Lost
              </Link>
              <Link to="/all-items/found" style={linkStyle}>
                Found
              </Link>
              <Link to="/raise-a-concern" style={linkStyle}>
                Raise a concern
              </Link>
              <Link to="/helpers" style={linkStyle}>
                Helpers
              </Link>
              <Link to="/claimants" style={linkStyle}>
                Claimers
              </Link>
              <Link to="/" style={linkStyle} onClick={handleLogout}>
                Logout
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link to="/sign-up" style={linkStyle}>
                Sign Up
              </Link>
              <Link to="/sign-in" style={linkStyle}>
                Sign In
              </Link>
            </>
          )}
        </div>
        <span style={iconStyle} onClick={handleToggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </span>
      </div>
      <div style={menuStyle}>
        <Link to="/home" style={linkStyle}>
          Home
        </Link>
        {user && (
          <>
            <Link to="/my-items" style={linkStyle}>
              My Items
            </Link>
            <Link to="/all-items" style={linkStyle}>
              All Items
            </Link>
            <Link to="/all-items/lost" style={linkStyle}>
              Lost
            </Link>
            <Link to="/all-items/found" style={linkStyle}>
              Found
            </Link>
            <Link to="/raise-a-concern" style={linkStyle}>
              Raise a concern
            </Link>
            <Link to="/helpers" style={linkStyle}>
              Helpers
            </Link>
            <Link to="/claimants" style={linkStyle}>
              Claimers
            </Link>
            <Link to="/" style={linkStyle} onClick={handleLogout}>
              Logout
            </Link>
          </>
        )}
        {!user && (
          <>
            <Link to="/sign-up" style={linkStyle}>
              Sign Up
            </Link>
            <Link to="/sign-in" style={linkStyle}>
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
