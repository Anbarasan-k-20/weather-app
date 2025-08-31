import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Loader from './components/Loader';

function App() {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!cityInput.trim()) return;

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}`
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found. Please try again.');
      }

      const { latitude, longitude, name } = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m`
      );
      const weatherJson = await weatherResponse.json();

      const formattedData = {
        cityName: name,
        current: weatherJson.current,
        current_units: weatherJson.current_units,
      };

      setWeatherData(formattedData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <h1>Weather Now</h1>
        <SearchBar
          cityInput={cityInput}
          setCityInput={setCityInput}
          handleSearch={handleSearch}
        />
        {loading && <Loader />}
        <WeatherDisplay
          weatherData={weatherData}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;