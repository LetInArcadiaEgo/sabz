import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ListingPage from './pages/listing/ListingPage';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';

const AppContent = () => {
  const location = useLocation();
  const isListingPage = location.pathname.includes('/property/');

  return (
    <div className="app">
      {!isListingPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<HomePage />} />
        <Route path="/property/:id" element={<ListingPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 