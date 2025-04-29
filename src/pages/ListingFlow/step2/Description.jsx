import React, { useState } from 'react';
import styles from '../ListingFlowIntro/ListingFlowIntro.module.css';
import { useNavigate } from 'react-router-dom';

const Description = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [selectedHighlights, setSelectedHighlights] = useState([]);

  const highlights = [
    { id: 'peaceful', label: 'Peaceful', icon: '🏡' },
    { id: 'unique', label: 'Unique', icon: '🌟' },
    { id: 'family-friendly', label: 'Family-friendly', icon: '👨‍👩‍👧‍👦' },
    { id: 'stylish', label: 'Stylish', icon: '✨' },
    { id: 'central', label: 'Central', icon: '📍' },
    { id: 'spacious', label: 'Spacious', icon: '🏰' }
  ];

  const toggleHighlight = (id) => {
    if (selectedHighlights.includes(id)) {
      setSelectedHighlights(selectedHighlights.filter(h => h !== id));
    } else if (selectedHighlights.length < 2) {
      setSelectedHighlights([...selectedHighlights, id]);
    }
  };

  const handleNext = () => {
    navigate('/listing-flow/step-2/publish');
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
        <h1>Next, let's describe your house</h1>
        <p className={styles.subtitle}>
          Choose up to 2 highlights. We'll use these to get your description started.
        </p>

        <div className={styles.highlightsGrid}>
          {highlights.map(highlight => (
            <button
              key={highlight.id}
              className={`${styles.highlightButton} ${selectedHighlights.includes(highlight.id) ? styles.selected : ''}`}
              onClick={() => toggleHighlight(highlight.id)}
            >
              <span className={styles.highlightIcon}>{highlight.icon}</span>
              {highlight.label}
            </button>
          ))}
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Forget your worries in this spacious and serene space."
          className={styles.descriptionInput}
          maxLength={500}
        />
        <div className={styles.charCount}>{description.length}/500</div>
      </div>

      <div className={styles.bottomNav}>
        <button onClick={handleBack} className={styles.backButton}>
          Back
        </button>
        <button 
          onClick={handleNext}
          className={styles.nextButton}
          disabled={!description.trim()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Description; 