import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListingsPage from './pages/ListingsPage/ListingsPage';
import DetailPage from './pages/DetailPage/DetailPage';
import './styles/App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/property/:id" element={<DetailPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 