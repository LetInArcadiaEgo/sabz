import React from 'react';
import styles from '../ListingFlowIntro/ListingFlowIntro.module.css';
import { useNavigate } from 'react-router-dom';

const Publish = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the next step or finish the flow
    navigate('/listing-flow/step3');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate('/listing-flow/save')} className={styles.saveExit}>
          Save & exit
        </button>
        <button className={styles.questions}>Questions?</button>
      </div>

      <div className={styles.contentSection}>
        <h1>Finish up and publish</h1>
        <p className={styles.subtitle}>
          Finally, you'll choose booking settings, set up pricing, and publish your listing.
        </p>

        <div className={styles.housePreview}>
          {/* Add a house preview image here */}
          <img 
            src="/house-preview.png" 
            alt="Modern house preview" 
            className={styles.previewImage}
          />
        </div>
      </div>

      <div className={styles.bottomNav}>
        <button onClick={handleBack} className={styles.backButton}>
          Back
        </button>
        <button 
          onClick={handleNext}
          className={styles.nextButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Publish; 