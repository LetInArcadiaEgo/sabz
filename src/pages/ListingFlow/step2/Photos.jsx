import React, { useState } from 'react';
import styles from '../ListingFlowIntro/ListingFlowIntro.module.css';
import { useNavigate } from 'react-router-dom';
import NavBottom from '../../../components/layout/BottomNav/BottomNav';

const Photos = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleNext = () => {
    navigate('/listing-flow/step-2/title');
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

      <h1>Add Photos of Your Property</h1>
      <div className={styles.uploadContainer}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className={styles.fileInput}
        />
        <div className={styles.selectedFiles}>
          {selectedFiles.map((file, index) => (
            <div key={index} className={styles.fileName}>
              {file.name}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomNav}>
        <button onClick={handleBack} className={styles.backButton}>
          Back
        </button>
        <button 
          onClick={handleNext}
          className={styles.nextButton}
          disabled={selectedFiles.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Photos;
