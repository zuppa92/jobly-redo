// src/Homepage.js
import React, { useContext } from 'react';
import { UserContext } from './UserContext'; // Corrected import statement

const Homepage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Homepage</h1>
      {user ? <p>Welcome, {user.username}</p> : <p>You are not logged in.</p>}
    </div>
  );
};

export default Homepage;