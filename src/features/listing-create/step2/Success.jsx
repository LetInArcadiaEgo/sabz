import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import styles from './Success.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // After 3 seconds, fade out the content
    const fadeTimeout = setTimeout(() => {
      document.getElementById('successContent').classList.add(styles.fadeOut);
    }, 3000);

    // After fade out, navigate to profile page
    const navigateTimeout = setTimeout(() => {
      navigate('/my-listings');
    }, 4000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(navigateTimeout);
    };
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div id="successContent" className={styles.content}>
        <h1 className={`${commonStyles.stepTitle} ${styles.successTitle}`}>
          You've posted to
        </h1>
        <img 
          src="/images/Sabz_Logo_WhiteBG_transparent.png" 
          alt="Sabz Logo" 
          className={styles.logo}
        />
      </div>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
        recycle={false}
        colors={['#1fb850', '#18a445', '#38D07C', '#8FCFA3']}
      />
    </div>
  );
};

export default Success; 