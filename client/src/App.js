import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import NotFound from './components/404';
import LostAndFoundForm from './components/LostAndFoundForm';
import HomePage from './components/HomePage';
import LostAndFoundList from './components/LostAndFoundList';
import HelperList from './components/HelperList';
import ClaimantList from './components/ClaimantList';
import PersonalItems from './components/PersonalItems';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    // Update authentication status when 'authToken' changes in localStorage
    setIsAuthenticated(!!localStorage.getItem('authToken'));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/raise-a-concern" element={<LostAndFoundForm />} />
        {/* <Route
          path="/items"
          element={isAuthenticated ? <LostAndFoundList /> : <Signin />}
        />
        <Route
          path="/items/lost"
          element={isAuthenticated ? <LostAndFoundList req="lost" /> : <Signin />}
        />
        <Route
          path="/items/found"
          element={isAuthenticated ? <LostAndFoundList req="found" /> : <Signin />}
        />
        <Route
          path="/helpers"
          element={isAuthenticated ? <HelperList /> : <Signin />}
        />
        <Route
          path="/claimants"
          element={isAuthenticated ? <ClaimantList /> : <Signin />}
        /> */}
        <Route path="/all-items" element={<LostAndFoundList />} />
        <Route path="/my-items" element={<PersonalItems />} />
        <Route path="/all-items/lost" element={<LostAndFoundList req="lost" />} />
        <Route path="/all-items/found" element={<LostAndFoundList req="found" />} />
        <Route path="/helpers" element={<HelperList />} />
        <Route path="/claimants" element={<ClaimantList />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
