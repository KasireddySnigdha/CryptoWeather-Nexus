import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import styles from "./Layout.module.css";
import "animate.css";

const Layout = ({ children, title = "Crypto Dashboard" }) => {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]); // For storing news articles

  // List of cities to fetch weather data for
  const cities = ["New York", "London", "Tokyo"];
  const apiKey = "MHMECMRHFLVE9K5UNNLDB78MW"; // Replace with your Visual Crossing API key

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch weather data for all cities concurrently
        const weatherData = await Promise.all(
          cities.map((city) =>
            axios.get(
              `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}`, {
                params: {
                  key: apiKey,
                  unitGroup: "us",
                  contentType: "json",
                },
              }
            ).catch((err) => {
              console.error(`Error fetching data for ${city}:`, err);
              return null;
            })
          )
        );

        // Filter out any failed requests
        const validWeatherData = weatherData.filter(response => response !== null);

        if (validWeatherData.length === 0) {
          throw new Error("All weather data requests failed.");
        }

        // Extract relevant weather details from the API response
        const weatherDetails = validWeatherData.map((response) => {
          const { resolvedAddress, days } = response.data;
          const { temp, humidity, conditions, icon } = days[0]; // Using the first day's data
          return {
            city: resolvedAddress,
            temperature: temp,
            humidity: humidity,
            description: conditions,
            icon: icon,
          };
        });

        setWeather(weatherDetails);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    const fetchNewsData = async () => {
      try {
        const response = await axios.get(
          'https://newsdata.io/api/1/news',
          {
            params: {
              apikey: 'pub_775451b0588167cc1dcb76540c2b43027e2e2', // Your API Key
              q: 'crypto',
              country: 'in',
              language: 'en',
            }
          }
        );
        
        const articles = response.data.results.slice(0, 5); // Get only 5 articles
        setNews(articles);
      } catch (err) {
        console.error("Error fetching news data:", err);
        setError("Failed to fetch news data");
      }
    };

    fetchWeatherData();
    fetchNewsData(); // Fetch news data on component mount
  }, []);

  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/1200x1200.png" />
      </Head>
      <header className={styles.header}></header>
      <div className={styles.dashboardContainer}>
        {/* Weather Section */}
        <div className={styles.weatherSection}>
          <h2>Weather</h2>
          {loading ? (
            <p>Loading weather data...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            weather.map((cityWeather, index) => (
              <div key={index} className={styles.weatherCard}>
                <h3>{cityWeather.city}</h3>
                <p>Temp: {cityWeather.temperature}°F</p>
                <p>Humidity: {cityWeather.humidity}%</p>
                <p>{cityWeather.description}</p>
                <img
                  src={`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/icons/${cityWeather.icon}.png`}
                  alt={cityWeather.description}
                />
              </div>
            ))
          )}
        </div>

        {/* News Section */}
        <div className={styles.newsSection}>
          <h2>Top Crypto News</h2>
          <ul>
            {news.map((article, index) => (
              <li key={index} className={styles.newsItem}>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
