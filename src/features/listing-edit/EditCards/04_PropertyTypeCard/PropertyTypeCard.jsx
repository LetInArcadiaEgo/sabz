import React from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './PropertyTypeCard.module.css';
import { PROPERTY_TYPES } from '../../../../components/common/data/propertyTypes';

const PropertyTypeCard = ({
  propertyType, // now expects a string like 'house', 'flat', etc.
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave,
  tempPropertyType,
  onPropertyTypeChange
}) => {
  const handlePropertySelect = (typeId) => {
    onPropertyTypeChange(typeId); // just pass the ID directly
  };

  // Find the display data for current type
  const currentType = PROPERTY_TYPES.find(t => t.id === (tempPropertyType || propertyType)) || PROPERTY_TYPES[0];

  return (
    <>
      <EditCard
        title="Property type"
        content={currentType.label}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={() => onSave('propertyType', tempPropertyType || propertyType)}
        title="Property type"
        initialData={propertyType}
      >
        <div className={styles.propertyTypeContainer}>
          <h2 className={styles.propertyTypeHeading}>Select your property type</h2>
          <div className={styles.cardGrid}>
            {PROPERTY_TYPES.map((type) => (
              <button
                key={type.id}
                className={`${styles.card} ${(tempPropertyType || propertyType) === type.id ? styles.selected : ''}`}
                onClick={() => handlePropertySelect(type.id)}
              >
                <span className={styles.cardIcon}>{React.createElement(type.icon)}</span>
                <span className={styles.cardLabel}>{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </EditModal>
    </>
  );
};

export default PropertyTypeCard; 