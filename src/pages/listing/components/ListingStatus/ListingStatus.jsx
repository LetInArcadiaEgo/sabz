import React from 'react';
import styles from './ListingStatus.module.css';

const ListingStatus = () => {
  return (
    <div className={styles.statusContainer}>
      <div className={styles.activeStatus}>
        <div className={styles.activeDot}></div>
        Active
      </div>
    </div>
  );
};

export default ListingStatus; 