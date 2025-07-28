import React from 'react';
import styles from './ListingMainInfo.module.css';
import { formatPrice } from '../../../../utils/listingUtils';

const ListingMainInfo = ({ price, title, locationDetails }) => {
  return (
    <div className={styles.mainInfo}>
      <div className={styles.price}>{formatPrice(price)}</div>
      <h1>{title}</h1>
      <div className={styles.location}>
        <p>{locationDetails}</p>
      </div>
    </div>
  );
};

export default ListingMainInfo; 