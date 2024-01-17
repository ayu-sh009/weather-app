
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [recentWeather, setRecentWeather] = useState([]);

  useEffect(() => {
    const fetchRecentWeather = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin');
        setRecentWeather(response.data.recent_weather_history);
      } catch (error) {
        console.error('Error fetching recent weather searches:', error);
      }
    };

    fetchRecentWeather();
  }, []);

  const handleDeleteWeather = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setRecentWeather((prevWeather) => prevWeather.filter((weather) => weather.id !== id));
    } catch (error) {
      console.log('Error deleting weather information:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Recent Weather Searches</h2>
      <ul>
        {recentWeather.map((search) => (
          <li key={search.id}>
            City: {search.city}, Temperature: {search.temperature}, Description: {search.description}
            <button onClick={() => handleDeleteWeather(search.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
