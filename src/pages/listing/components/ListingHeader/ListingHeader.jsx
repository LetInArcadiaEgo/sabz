import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './ListingHeader.module.css';

const ListingHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <button onClick={() => navigate('/listings')} className={styles.backButton}>
        <FaArrowLeft />
      </button>
      <div className={styles.logoContainer}>
        <img src="/images/Sabz_Logo_WhiteBG_transparent.png" alt="Sabz Logo" className={styles.logo} />
        <span className={styles.tagline}>Ghar dhoondna,{'\n'}abh simple!</span>
      </div>
    </div>
  );
};

export default ListingHeader; 