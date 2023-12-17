import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import NotFound from "./components/404";
import LostAndFoundForm from "./components/LostAndFoundForm";
import HomePage from "./components/HomePage";
import LostAndFoundList from "./components/LostAndFoundList";
import HelperList from "./components/HelperList";
import ClaimantList from "./components/ClaimantList";
import PersonalItems from "./components/PersonalItems";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./utils/userSlice";

const App = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/raise-a-concern" element={<LostAndFoundForm />} />
        <Route
          path="/all-items"
          element={user ? <LostAndFoundList /> : <Signin />}
        />
        <Route
          path="/my-items"
          element={user ? <PersonalItems /> : <Signin />}
        />
        <Route
          path="/all-items/lost"
          element={user ? <LostAndFoundList req="lost" /> : <Signin />}
        />
        <Route
          path="/all-items/found"
          element={user ? <LostAndFoundList req="found" /> : <Signin />}
        />
        <Route path="/helpers" element={user ? <HelperList /> : <Signin />} />
        <Route
          path="/claimants"
          element={user ? <ClaimantList /> : <Signin />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
