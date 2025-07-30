import React from 'react';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import styles from './ListingFeatures.module.css';

const ListingFeatures = ({ squareFootage, bedrooms, bathrooms }) => {
  return (
    <div className={styles.mainFeatures}>
      {squareFootage && (
        <div className={styles.feature}>
          <FaRulerCombined />
          <span>{squareFootage}</span>
        </div>
      )}
      <div className={styles.feature}>
        <FaBed />
        <span>{bedrooms} Bedrooms</span>
      </div>
      <div className={styles.feature}>
        <FaBath />
        <span>{bathrooms} Bathrooms</span>
      </div>
    </div>
  );
};

export default ListingFeatures; 