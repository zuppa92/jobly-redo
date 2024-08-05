// src/NavBar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext'; // Corrected import statement
import './NavBar.css';

function NavBar({ logout }) {
  const { user } = useContext(UserContext);

  return (
    <nav className="NavBar navbar navbar-expand-md navbar-light bg-light">
      <Link className="navbar-brand" to="/">Jobly</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/companies">Companies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/jobs">Jobs</Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={logout} to="/">Logout</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">Hello, {user.username}</span>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;