import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingsData } from '../../listings';
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


const ListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listingsData.find(item => item.id === parseInt(id));

  if (!listing) {
    return (
      <div className={styles.detailPage}>
        <h1>Property Not Found</h1>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          <FaArrowLeft />
        </button>
      </div>
    );
  }

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
            locationDetails={listing.locationDetails}
          />
          <ListingFeatures 
            squareFootage={listing.squareFootage}
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