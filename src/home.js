import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  return (
    <div className="container">
      <h1>Weather App</h1>
        <ul>
          <li>
            <Link to="/userlogin">User Login</Link>
          </li>
          <li>
            <Link to="adminlogin">Admin login</Link>
          </li>
        </ul>
      <hr />
    </div>
  );
}

export default Home;
