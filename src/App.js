import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ListingPage from './pages/listing/ListingPage';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import BottomNav from './components/layout/BottomNav/BottomNav';
import { auth } from './config/firebase';
import ListingFlowIntro from './features/listing-create/intro/ListingFlowIntro';
import PropType from './features/listing-create/step1/PropType';
import BasicInfo from './features/listing-create/step1/BasicInfo';
import Address from './features/listing-create/step1/Address';
import Amenities from './features/listing-create/step1/Amenities';
import Step2Intro from './features/listing-create/step2/Step2Intro';
import Photos from './features/listing-create/step2/Photos';
import Title from './features/listing-create/step2/Title';
import Description from './features/listing-create/step2/Description';
import Price from './features/listing-create/step2/Price';
import Publish from './features/listing-create/step2/Publish';
import Success from './features/listing-create/step2/Success';
import MyListings from './features/my-listings/MyListings';
import EditListingPage from './features/listing-edit/EditListing';

const NAVBAR_VISIBLE_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/search'
];

const AppContent = () => {
  const location = useLocation();
  const isListingFlow = location.pathname.includes('/listing-flow');
  const shouldShowNavbar = NAVBAR_VISIBLE_ROUTES.includes(location.pathname);
  const shouldShowFooterAndNav = !isListingFlow && 
    !location.pathname.startsWith('/property/') && 
    !location.pathname.includes('/my-listings/edit/');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:id" element={<ListingPage />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/my-listings/edit/:id" element={<EditListingPage />} />
        
        {/* Listing Flow Routes */}
        <Route path="/listing-flow" element={<ListingFlowIntro />} />
        <Route path="/listing-flow/step-1/1_proptype" element={<PropType />} />
        <Route path="/listing-flow/step-1/2_basicinfo" element={<BasicInfo />} />
        <Route path="/listing-flow/step-1/3_address" element={<Address />} />
        <Route path="/listing-flow/step-1/4_amenities" element={<Amenities />} />
        <Route path="/listing-flow/step-2/intro" element={<Step2Intro />} />
        <Route path="/listing-flow/step-2/1_photos" element={<Photos />} />
        
        {/* New Step2 Routes */}
        <Route path="/listing-flow/step-2/title" element={<Title />} />
        <Route path="/listing-flow/step-2/description" element={<Description />} />
        <Route path="/listing-flow/step-2/price" element={<Price />} />
        <Route path="/listing-flow/step-2/publish" element={<Publish />} />
        <Route path="/listing-flow/success" element={<Success />} />
      </Routes>
      {shouldShowFooterAndNav && <Footer />}
      {shouldShowFooterAndNav && <BottomNav />}
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