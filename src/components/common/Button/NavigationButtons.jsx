import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavigationButtons.module.css';

const NavigationButtons = ({ 
  onNext, 
  onBack, 
  disableNext = false, 
  nextLabel = 'Next',
  backLabel = 'Back',
  className
}) => {
  const navigate = useNavigate();
  const handleBack = onBack || (() => navigate(-1));

  return (
    <div className={`${styles.navigationContainer} ${className || ''}`}>
      <button 
        className={styles.backLink}
        onClick={handleBack}
      >
        {backLabel}
      </button>
      <button 
        className={styles.nextButton} 
        onClick={onNext}
        disabled={disableNext}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default NavigationButtons; 