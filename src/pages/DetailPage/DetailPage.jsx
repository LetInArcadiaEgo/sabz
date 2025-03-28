import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingsData } from '../../listings';
import { FaBed, FaBath, FaRulerCombined, FaArrowLeft } from 'react-icons/fa';
import styles from './DetailPage.module.css';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const listing = listingsData.find(item => item.id === parseInt(id));

  if (!listing) {
    return (
      <div className={styles.detailPage}>
        <h1>Property Not Found</h1>
        <button onClick={() => navigate('/listings')} className={styles.backButton}>
          <FaArrowLeft /> Back to Listings
        </button>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      <button onClick={() => navigate('/listings')} className={styles.backButton}>
        <FaArrowLeft /> Back to Listings
      </button>
      
      <div className={styles.propertyDetails}>
        <div className={styles.imageContainer}>
          <img src={listing.image} alt={listing.title} />
        </div>
        
        <div className={styles.content}>
          <h1>{listing.title}</h1>
          <div className={styles.price}>PKR {listing.price.toLocaleString()}</div>
          
          <div className={styles.mainFeatures}>
            <div className={styles.feature}>
              <FaBed />
              <span>{listing.bedrooms} Bedrooms</span>
            </div>
            <div className={styles.feature}>
              <FaBath />
              <span>{listing.bathrooms} Bathrooms</span>
            </div>
            <div className={styles.feature}>
              <FaRulerCombined />
              <span>{listing.squareFootage}</span>
            </div>
          </div>

          <div className={styles.propertyType}>
            <h2>Property Type</h2>
            <p>{listing.propertyType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage; 