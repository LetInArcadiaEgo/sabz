import React from 'react';
import styles from './BedroomFilter.module.css';

const BEDROOM_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5+', label: '5+' }
];

const BedroomFilter = ({ value, onChange }) => {
  const handleSelect = (bedroomValue) => {
    // Toggle selection - if already selected, deselect to 'any'
    const newValue = value === bedroomValue ? 'any' : bedroomValue;
    onChange(newValue === 'any' ? null : newValue);
  };

  // Normalize value for comparison (null -> 'any')
  const normalizedValue = value || 'any';

  return (
    <div className={styles.container}>
      {BEDROOM_OPTIONS.map((option) => {
        const isSelected = normalizedValue === option.value;
        
        return (
          <button
            key={option.value}
            className={`${styles.bedroomButton} ${isSelected ? styles.selected : ''}`}
            onClick={() => handleSelect(option.value)}
            type="button"
          >
            <span className={styles.label}>{option.label}</span>
            {option.value !== 'any' && (
              <span className={styles.suffix}>
                {option.value === '5+' ? 'bedrooms' : option.value === '1' ? 'bedroom' : 'bedrooms'}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BedroomFilter;