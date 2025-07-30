import React from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './AmenitiesCard.module.css';
import { AMENITIES } from '../../../../components/common/data/amenities';

const AmenitiesForm = ({ value, onChange }) => {
  const selectedAmenities = value || [];

  const handleAmenityToggle = (amenityId) => {
    const isSelected = selectedAmenities.includes(amenityId);
    const newAmenities = isSelected
      ? selectedAmenities.filter(id => id !== amenityId)
      : [...selectedAmenities, amenityId];
    onChange(newAmenities);
  };

  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <div className={styles.cardGrid}>
          {AMENITIES.map((amenity) => (
            <button
              key={amenity.id}
              className={`${styles.card} ${selectedAmenities.includes(amenity.id) ? styles.selected : ''}`}
              onClick={() => handleAmenityToggle(amenity.id)}
            >
              <span className={styles.cardIcon}>{React.createElement(amenity.icon)}</span>
              <span className={styles.cardLabel}>{amenity.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const AmenitiesCard = ({
  amenities,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave
}) => {
  const amenitiesCount = amenities?.length || 0;
  const displayText = amenitiesCount > 0 
    ? `${amenitiesCount} amenities selected`
    : 'Add amenities';

  return (
    <>
      <EditCard
        title="Amenities"
        content={displayText}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={(tempData) => onSave('amenities', tempData)}
        title="Amenities"
        initialData={amenities}
      >
        <AmenitiesForm />
      </EditModal>
    </>
  );
};

export default AmenitiesCard; 