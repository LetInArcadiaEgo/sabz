import React, { useState } from 'react';
import styles from './PropType.module.css';
import commonStyles from './ListingFlowCommon.module.css'; 
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBuilding, FaBed } from 'react-icons/fa';
import { MdHouse, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';

const PropType = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const propertyTypes = [
    { id: 'house', label: 'House', icon: <FaHome size={24} /> },
    { id: 'flat', label: 'Flat', icon: <FaBuilding size={24} /> },
    { id: 'upper', label: 'Upper Portion', icon: <MdArrowUpward size={24} /> },
    { id: 'lower', label: 'Lower Portion', icon: <MdArrowDownward size={24} /> },
    { id: 'room', label: 'Room', icon: <FaBed size={24} /> },
    { id: 'farmhouse', label: 'Farm House', icon: <MdHouse size={24} /> }
  ];

  const handleNext = () => {
    if (selectedType) {
      navigate('/listing-flow/step-1/2_basicinfo');
    }
  };

  const handlePropertySelect = (typeId) => {
    setSelectedType(typeId);
  };

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.content}>
        <h1 className={commonStyles.stepTitle}>Which of these best describes your property?</h1>

        <div className={styles.propertyTypeGrid}>
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              className={`${styles.propertyTypeCard} ${selectedType === type.id ? styles.selected : ''}`}
              onClick={() => handlePropertySelect(type.id)}
            >
              <span className={styles.propertyTypeIcon}>{type.icon}</span>
              <span className={styles.propertyTypeLabel}>{type.label}</span>
            </button>
          ))}
        </div>

        <NavigationButtons 
          onNext={handleNext}
          disableNext={!selectedType}
        />
      </div>
    </div>
  );
};

export default PropType;
