import React from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './PropertyTypeCard.module.css';
import { PROPERTY_TYPES } from '../../../../components/common/data/propertyTypes';

const PropertyTypeForm = ({ value, onChange }) => {
  return (
    <div className={styles.propertyTypeContainer}>
      <h2 className={styles.propertyTypeHeading}>Select your property type</h2>
      <div className={styles.cardGrid}>
        {PROPERTY_TYPES.map((type) => (
          <button
            key={type.id}
            className={`${styles.card} ${value === type.id ? styles.selected : ''}`}
            onClick={() => onChange(type.id)}
          >
            <span className={styles.cardIcon}>{React.createElement(type.icon)}</span>
            <span className={styles.cardLabel}>{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const PropertyTypeCard = ({
  propertyType,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave
}) => {
  // Find the display data for current type
  const currentType = PROPERTY_TYPES.find(t => t.id === propertyType) || PROPERTY_TYPES[0];

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
        onSave={(tempData) => onSave('propertyType', tempData)}
        title="Property type"
        initialData={propertyType}
      >
        <PropertyTypeForm />
      </EditModal>
    </>
  );
};

export default PropertyTypeCard; 