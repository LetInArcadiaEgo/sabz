import React, { useState } from 'react';
import styles from '../ListingFlowIntro/ListingFlowIntro.module.css';
import { useNavigate } from 'react-router-dom';

const Title = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const handleNext = () => {
    navigate('/listing-flow/step-2/description');
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
        <h1>Now, let's give your house a title</h1>
        <p className={styles.subtitle}>
          Short titles work best. Have fun with it—you can always change it later.
        </p>

        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="The House!"
          className={styles.titleInput}
          maxLength={32}
        />
        <div className={styles.charCount}>{title.length}/32</div>
      </div>

      <div className={styles.bottomNav}>
        <button onClick={handleBack} className={styles.backButton}>
          Back
        </button>
        <button 
          onClick={handleNext}
          className={styles.nextButton}
          disabled={!title.trim()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Title; 