
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './user_login.css'; 

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username: username,
        password: password,
      });

      console.log(response.data);
      navigate('/admin');
    } catch (error) {
      setError('Invalid username or password');
      console.log('Admin login failed:', error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Login</h1>
      {error && <p>{error}</p>}
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
