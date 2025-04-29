import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavigationButtons.module.css';

const NavigationButtons = ({ onNext, disableNext = false }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.navigationContainer}>
      <button 
        className={styles.backLink}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <button 
        className={styles.nextButton} 
        onClick={onNext}
        disabled={disableNext}
      >
        Next
      </button>
    </div>
  );
};

export default NavigationButtons; 