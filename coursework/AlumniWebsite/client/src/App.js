import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Calendar from './Components/Calendar';
import NewSignup from './Components/NewSignup';
import Login from './Components/Login';
import Admin from './Components/Admin';
import EventDashboard from './Components/EventDashboard';
import Home from './Components/Home';
import modal from 'react-modal';

modal.setAppElement('#root');

function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Login logic and set the `isLoggedIn` state accordingly
  
  //useEffect(() => {
    // Check the user's authentication status and set the `isLoggedIn` state
    //const userIsLoggedIn = checkUserAuthentication(); 
    //setIsLoggedIn(userIsLoggedIn);
  //}, []);

  //const checkUserAuthentication = () => {
 // Return true if the user is authenticated; otherwise, return false
    //return true; 
  //};

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
        {/*<Route path="calendar" element={isLoggedIn ? <Calendar /> : <Navigate to="/login" />} /> */}
          <Route path="calendar" element={<Calendar />} />
          <Route path="login" element={<Login />} />
          <Route path="newsignup" element={<NewSignup />} />
          <Route path="admin" element={<Admin />} />
          <Route path="eventdashboard" element={<EventDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
