import { useState, useCallback } from 'react';
import '../assets/css/WeatherForecast.css';

interface WeatherResponse {
  location: {
    name: string;
    countryCode: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  weather: {
    latitude: number;
    longitude: number;
    timezone: string;
    current: {
      time: string;
      temperatureC: number;
      relativeHumidityPercent: number;
      apparentTemperatureC: number;
      precipitationMm: number;
      weatherCode: number;
      windSpeedKmh: number;
    };
  };
}

const WeatherPage = () => {
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const API_BASE = 'http://localhost:8000/api/Weather/current-by-city';

  /* ===== Fetch weather ===== */
  const fetchWeather = useCallback(async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const url = `${API_BASE}?city=${encodeURIComponent(
        city
      )}&countryCode=${encodeURIComponent(countryCode)}`;

      const response = await fetch(url, {
        headers: {
          Accept: 'text/plain',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WeatherResponse = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      setWeather(null);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [city, countryCode]);

  /* ===== Handle submit ===== */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-page-container">
      {/* Header */}
      <header className="weather-page-header">
        <h1 className="weather-page-title">Weather Forecast</h1>
        <p className="weather-page-subtitle">
          Get current weather by city
        </p>

        <form onSubmit={handleSearch} className="weather-page-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City (e.g. Bucharest)"
            className="weather-page-input"
          />

          <input
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            placeholder="Country Code (RO, US, DE)"
            className="weather-page-input"
          />

          <button
            type="submit"
            className="weather-page-btn"
            disabled={loading || !city.trim()}
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </form>
      </header>

      {/* Error */}
      {error && (
        <div className="weather-page-error">
          <p>⚠️ {error}</p>
          <button onClick={fetchWeather} className="weather-page-retry-btn">
            Retry
          </button>
        </div>
      )}

      {/* Weather result */}
      {weather && (
        <div className="weather-page-card">
          <h2 className="weather-page-location">
            {weather.location.name}, {weather.location.countryCode}
          </h2>

          <p className="weather-page-time">
            🕒 {new Date(weather.weather.current.time).toLocaleString()}
          </p>

          <div className="weather-page-stats">
            <p>🌡️ Temperature: {weather.weather.current.temperatureC} °C</p>
            <p>
              🤔 Feels like:{' '}
              {weather.weather.current.apparentTemperatureC} °C
            </p>
            <p>
              💧 Humidity:{' '}
              {weather.weather.current.relativeHumidityPercent}%
            </p>
            <p>
              🌧️ Precipitation:{' '}
              {weather.weather.current.precipitationMm} mm
            </p>
            <p>
              💨 Wind: {weather.weather.current.windSpeedKmh} km/h
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !weather && !error && (
        <div className="weather-page-empty">
          <div className="weather-page-empty-icon">
            {hasSearched ? '🌫️' : '☀️'}
          </div>
          <p>
            {hasSearched
              ? 'No weather data found. Try another city.'
              : 'Enter a city to check the weather'}
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="weather-page-loading">
          <div className="weather-page-spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
