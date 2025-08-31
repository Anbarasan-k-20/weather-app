import './WeatherDisplay.css';

// Removed motion import since it wasn't used
const WeatherDisplay = ({ weatherData, loading, error }) => {
  if (loading) {
    return null;
  }

  if (error) {
    return <p className="error-message">🚨 {error}</p>;
  }

  if (!weatherData) {
    return <p className="welcome-message">Welcome! Search for a city's weather.</p>;
  }

  const getWeatherCondition = (code) => {
    if (code === 0) return 'Clear sky';
    if (code > 0 && code < 50) return 'Cloudy';
    if (code >= 50 && code < 70) return 'Rainy';
    return 'Weather condition unknown';
  };

  return (
    <div className="weather-card">
      <h2>{weatherData.cityName}</h2>
      <div className="weather-info">
        <div className="temp">
          {weatherData.current.temperature_2m}
          {weatherData.current_units.temperature_2m}
        </div>
        <div className="condition">
          {getWeatherCondition(weatherData.current.weather_code)}
        </div>
        <div className="details">
          <p>Humidity: {weatherData.current.relative_humidity_2m}{weatherData.current_units.relative_humidity_2m}</p>
          <p>Wind: {weatherData.current.wind_speed_10m}{weatherData.current_units.wind_speed_10m}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;