import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ListingPage from './pages/listing/ListingPage';
import SubmitListingPage from './pages/SubmitListingPage/SubmitListingPage';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import BottomNav from './components/layout/BottomNav/BottomNav';
import { auth } from './config/firebase';

const AppContent = () => {
  const location = useLocation();
  const isListingPage = location.pathname.includes('/property/');
  const isSubmitPage = location.pathname === '/submit';

  console.log('Firebase Auth initialized:', auth);

  return (
    <div className="app">
      {!isListingPage && !isSubmitPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:id" element={<ListingPage />} />
        <Route path="/submit" element={<SubmitListingPage />} />
      </Routes>
      {!isSubmitPage && <Footer />}
      {!isSubmitPage && <BottomNav />}
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