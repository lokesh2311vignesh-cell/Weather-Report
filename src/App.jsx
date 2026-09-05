import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "2e14f560512dd4815cd5e20ac1930a1c";

  const getWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())},IN&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.message || "Something went wrong");
}

      const data = await response.json();

      setWeather(data);
    } catch (err) {
      setError("City not found. Please try again!");
      setWeather(null);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  return (
    <div className="app">
      <div className="weather-container">

        <div className="header">
          <div className="cloud">☁️</div>

          <div>
            <h1>Weather Report</h1>
            <p>Get real-time weather updates for any city.</p>
          </div>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter your city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button onClick={getWeather}>
            Get Weather
          </button>
        </div>

        {loading && (
          <p className="loading">Loading weather details... ☁️</p>
        )}

        {error && (
          <p className="error">{error}</p>
        )}

        {weather && (
          <div className="weather-card">

            <h2>🌤️ Weather Overview</h2>

            <div className="main-weather">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="weather icon"
              />

              <h3>{weather.name}</h3>

              <div className="big-temp">
                {Math.round(weather.main.temp)}°C
              </div>

              <p className="description">
                {weather.weather[0].description}
              </p>
            </div>

            <hr />

            <div className="weather-details">

              <div className="detail">
                <span>🌡️ Temperature</span>
                <strong>{Math.round(weather.main.temp)} °C</strong>
              </div>

              <div className="detail">
                <span>☁️ Weather</span>
                <strong>{weather.weather[0].main}</strong>
              </div>

              <div className="detail">
                <span>💧 Humidity</span>
                <strong>{weather.main.humidity}%</strong>
              </div>

              <div className="detail">
                <span>🎈 Pressure</span>
                <strong>{weather.main.pressure} hPa</strong>
              </div>

              <div className="detail">
                <span>💨 Wind Speed</span>
                <strong>{weather.wind.speed} m/s</strong>
              </div>

              <div className="detail">
                <span>🌡️ Feels Like</span>
                <strong>
                  {Math.round(weather.main.feels_like)} °C
                </strong>
              </div>

            </div>

          </div>
        )}

        {!weather && !loading && (
          <div className="empty-card">
            🌍 <br />
            Search for a city to see the weather
          </div>
        )}

        <p className="footer">
          🌐 Real-time weather data powered by OpenWeatherMap
        </p>

      </div>
    </div>
  );
}

export default App;