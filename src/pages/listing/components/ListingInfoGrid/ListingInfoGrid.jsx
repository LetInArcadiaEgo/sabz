import React from 'react';
import { FaHome, FaClock, FaCar, FaStar, FaHammer, FaCertificate } from 'react-icons/fa';
import styles from './ListingInfoGrid.module.css';

const ListingInfoGrid = ({ listing }) => {
  const infoCards = [
    { icon: FaHome, field: 'propertyType' },
    { icon: FaClock, field: 'listingAdded' },
    { icon: FaCar, field: 'parking' },
    { icon: FaStar, field: 'highlight' },
    { icon: FaHammer, field: 'age' },
    { icon: FaCertificate, field: 'status' }
  ];

  return (
    <div className={styles.infoCardsGrid}>
      {infoCards.map(({ icon: Icon, field }) => (
        <div key={field} className={styles.infoCard}>
          <Icon />
          {listing[field]}
        </div>
      ))}
    </div>
  );
};

export default ListingInfoGrid; 