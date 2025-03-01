import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Welcompage from "./Welcomepage/Welcompage";
import LoginPage from "./LoginPage/LoginPage";
import Register from "./Register/Register";
import ForgotPassword from "./Forgotpassword/Forgotpassword";
import Homepage from "./Homepage/HomePage";
import Profile from "./Profile/Profile";
import AccountSettings from "./AccountSettings/AccountSettings";
import Score from "./Score/Score";

function App() {
  return (
    <Router>
      <Routes>
        <Route path= "/" element = {<Welcompage />} />
        <Route path="login" element = {<LoginPage />} />
        <Route path="register" element = {<Register />} />
        <Route path="forgotpassword" element ={<ForgotPassword />} />
        <Route path="homepage" element = {<Homepage />} />
        <Route path="profile" element = {<Profile />} />
        <Route path="account-settings" element = {<AccountSettings />} />
        <Route path="score" element = {<Score />} />
      </Routes>
    </Router>
  );
}


export default App;
