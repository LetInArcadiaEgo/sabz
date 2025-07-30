import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './ListingPage.module.css';

import ListingHeader from './components/ListingHeader/ListingHeader';
import ListingImage from './components/ListingImage/ListingImage';
import ListingStatus from './components/ListingStatus/ListingStatus';
import ListingMainInfo from './components/ListingMainInfo/ListingMainInfo';
import ListingFeatures from './components/ListingFeatures/ListingFeatures';
import ListingInfoGrid from './components/ListingInfoGrid/ListingInfoGrid';
import ListingDescription from './components/ListingDescription/ListingDescription';
import ListingContact from './components/ListingContact/ListingContact';
import { useListing } from '../../hooks/useListing';
import { formatSquareFootage, formatLocationDetails } from '../../utils/listingUtils';

const ListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // If navigated from HomePage we may have the listing in state
  const preloadedListing = location.state?.listing;

  const { data: fetchedListing, isLoading, error } = useListing(preloadedListing ? null : id);

  const listing = preloadedListing || fetchedListing;

  if (!preloadedListing && isLoading) {
    return (
      <div className={styles.detailPage}>
        <h1>Loading...</h1>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          <FaArrowLeft />
        </button>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className={styles.detailPage}>
        <h1>Property Not Found</h1>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          <FaArrowLeft />
        </button>
      </div>
    );
  }

  // Map backend fields to UI-friendly values ------------------------------
  const totalArea = listing.totalArea ?? listing.total_area ?? listing.area;
  const areaUnit  = listing.areaUnit  ?? listing.area_unit  ?? listing.unit;
  const squareFootage   = formatSquareFootage(totalArea, areaUnit);
  const locationDetails = formatLocationDetails(listing);

  return (
    <div className={styles.detailPage}>
      <ListingHeader />
      <div className={styles.propertyDetails}>
        <ListingImage images={listing.images || [listing.image]} title={listing.title} />
        
        <div className={styles.content}>
          <ListingStatus />
          <ListingMainInfo 
            price={listing.price}
            title={listing.title}
            locationDetails={locationDetails}
          />
          <ListingFeatures 
            squareFootage={squareFootage}
            bedrooms={listing.bedrooms}
            bathrooms={listing.bathrooms}
          />
          <ListingInfoGrid listing={listing} />
          <ListingDescription description={listing.description} />
          <ListingContact />
        </div>
      </div>
    </div>
  );
};

export default ListingPage; 