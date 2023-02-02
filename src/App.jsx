import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import SignUpPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import FeedPage from "./pages/FeedPage/FeedPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CryptoPricesPage from './pages/CryptoPricesPage/CryptoPricesPage';
// import the userService so we have a function (getUser) that can get the jwt token
// from localstorage and decode it
import userService from "./utils/userService";

export default function App() {
  const [user, setUser] = useState(userService.getUser()); // if theres a token, grab it, if not the value will be null

  // we need a function to pass down to LoginPage or the Signup page to be called after
  // the api request to login or sign up has been made
  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getUser, gets the jwt from localstorage and decodes it
  }

  function handleLogout() {

    console.log('being called')
    userService.logout();
    setUser(null);
  }
  if (user) {
    // are we logged in?
    return (
      <Routes>
        <Route
        path='/CryptoPricesPage'
        element={<CryptoPricesPage
          loggedUser={user} handleLogout={handleLogout}/>}
          />
        <Route
          path="/"
          element={<FeedPage loggedUser={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/:username"
          element={
            <ProfilePage loggedUser={user} handleLogout={handleLogout} />
          }
        />
      </Routes>
    );
}

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}