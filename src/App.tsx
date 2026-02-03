import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './app/Navbar';
import HomePage from './app/HomePage';
import SearchPage from './app/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;