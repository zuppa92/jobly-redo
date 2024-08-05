// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Homepage from './Homepage';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import Profile from './Profile';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import JoblyApi from './api';
import { UserContextProvider } from './UserContext';
import { jwtDecode } from 'jwt-decode'; // Use named import
import './App.css'; // Import the CSS file

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token); // Log the token for debugging
      if (token) {
        JoblyApi.token = token;
        try {
          const userData = await JoblyApi.getCurrentUser();
          console.log('Fetched user data:', userData); // Log fetched user data
          setUser(userData);
        } catch (err) {
          console.error('Failed to fetch user data', err.response ? err.response.data : err.message);
          if (err.response && err.response.status === 401) {
            logout();
          }
        }
      }
    }
    fetchUser();
  }, []);

  const signup = async (data) => {
    try {
      const token = await JoblyApi.register(data);
      localStorage.setItem('token', token);
      JoblyApi.token = token;
      const userData = await JoblyApi.getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error('Error during signup', err.response ? err.response.data : err.message);
      throw err;
    }
  };

  const login = async (data) => {
    try {
      const token = await JoblyApi.login(data);
      localStorage.setItem('token', token);
      JoblyApi.token = token;
      const userData = await JoblyApi.getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error('Error during login', err.response ? err.response.data : err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    JoblyApi.token = null;
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <UserContextProvider>
        <NavBar logout={logout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:handle" element={<CompanyDetail />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Navigate to="/" />} />
        </Routes>
      </UserContextProvider>
    </Router>
  );
}

export default App;