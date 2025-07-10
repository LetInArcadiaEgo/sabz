import React from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './PropertyTypeCard.module.css';
import { FaHome, FaBuilding, FaBed } from 'react-icons/fa';
import { MdHouse, MdArrowUpward, MdArrowDownward } from 'react-icons/md';

const propertyTypes = [
  { id: 'house', label: 'House', icon: <FaHome />, value: 'House' },
  { id: 'apartment', label: 'Apartment', icon: <FaBuilding />, value: 'Apartment' },
  { id: 'upper', label: 'Upper Portion', icon: <MdArrowUpward />, value: 'Upper Portion' },
  { id: 'lower', label: 'Lower Portion', icon: <MdArrowDownward />, value: 'Lower Portion' },
  { id: 'room', label: 'Room', icon: <FaBed />, value: 'Room' },
  { id: 'villa', label: 'Villa', icon: <MdHouse />, value: 'Villa' }
];

const PropertyTypeCard = ({
  propertyType,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave,
  tempPropertyType,
  onPropertyTypeChange
}) => {
  const handlePropertySelect = (value) => {
    onPropertyTypeChange({
      ...(tempPropertyType || propertyType),
      place: value
    });
  };

  return (
    <>
      <EditCard
        title="Property type"
        content={propertyType.place}
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
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                className={`${styles.card} ${(tempPropertyType || propertyType).place === type.value ? styles.selected : ''}`}
                onClick={() => handlePropertySelect(type.value)}
              >
                <span className={styles.cardIcon}>{type.icon}</span>
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