import React, { useState } from 'react';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getWeatherData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/weather?city=${city}`);
      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setErrorMessage(null);
      }
    } catch (error) {
      console.log('Error fetching weather data:', error);
      setErrorMessage('Error fetching weather data.');
      setWeatherData(null);
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Weather App</h1>

      <p style={{ fontSize: '1.2rem' }}>Search for weather</p>

      <div style={{ display: 'flex', marginTop: '1rem' }}>
        <input
          type="text"
          style={{
            padding: '0.5rem',
            marginRight: '0.5rem',
            fontSize: '1rem',
          }}
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button
          type="button"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={getWeatherData}
        >
          Get Weather
        </button>
      </div>

      {errorMessage && (
        <p style={{ fontSize: '1rem', color: 'red', marginTop: '1rem' }}>
          {errorMessage}
        </p>
      )}

      {weatherData && (
        <div style={{ marginTop: '1rem', maxWidth: '18rem' }}>
          <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
            <h5 style={{ fontSize: '1.2rem' }}>City: {weatherData.name}</h5>
            <p style={{ fontSize: '1rem' }}>
              Weather: {weatherData.weather[0].description}
            </p>
            <p style={{ fontSize: '1rem' }}>
              Temperature: {weatherData.main.temp}°C
            </p>
            <p style={{ fontSize: '1rem' }}>
              Humidity: {weatherData.main.humidity}%
            </p>
            <p style={{ fontSize: '1rem' }}>
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
            <p style={{ fontSize: '1rem' }}>
              Cloudiness: {weatherData.clouds.all}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;