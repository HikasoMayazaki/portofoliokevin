import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './app/Navbar';
import HomePage from './app/HomePage';
import SearchPage from './app/SearchPage';
import WeatherPage from './app/WeatherPage';
import NewsFeed from './app/newsfeed';
import './assets/css/dark-win98.css';
import SnakeGame from './app/SnakeGame';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored as 'dark' | 'light';
    } catch (e) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className={`app-root ${theme === 'dark' ? 'theme-dark win98-doom' : 'theme-light'}`}>
      <BrowserRouter>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/weather" element={<WeatherPage />} /> {/* Add this line */}
          <Route path="/news" element={<NewsFeed />} /> {/* Add this line */}
          <Route path="/snake" element={<SnakeGame />} /> {/* Add this line */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;