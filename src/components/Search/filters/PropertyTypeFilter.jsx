import React from 'react';
import { PROPERTY_TYPES } from '../../common/data/propertyTypes';
import styles from './PropertyTypeFilter.module.css';

const PropertyTypeFilter = ({ value, onChange }) => {
  const handleSelect = (propertyTypeId) => {
    // Toggle selection - if already selected, deselect
    const newValue = value === propertyTypeId ? null : propertyTypeId;
    onChange(newValue);
  };

  return (
    <div className={styles.container}>
      {PROPERTY_TYPES.map((type) => {
        const IconComponent = type.icon;
        const isSelected = value === type.id;
        
        return (
          <button
            key={type.id}
            className={`${styles.typeButton} ${isSelected ? styles.selected : ''}`}
            onClick={() => handleSelect(type.id)}
            type="button"
          >
            <div className={styles.iconContainer}>
              <IconComponent className={styles.icon} />
            </div>
            <span className={styles.label}>{type.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PropertyTypeFilter;