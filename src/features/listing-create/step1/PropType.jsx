import React, { useState } from 'react';
import { useListingDraft } from '../../../context/ListingDraftProvider';
import styles from './PropType.module.css';
import commonStyles from './ListingFlowCommon.module.css'; 
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBuilding, FaBed } from 'react-icons/fa';
import { MdHouse, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';

const PropType = () => {
  const navigate = useNavigate();
  const { setDraft } = useListingDraft();
  const [selectedType, setSelectedType] = useState(null);

  const propertyTypes = [
    { id: 'house', label: 'House', icon: <FaHome /> },
    { id: 'flat', label: 'Flat', icon: <FaBuilding /> },
    { id: 'upper', label: 'Upper Portion', icon: <MdArrowUpward /> },
    { id: 'lower', label: 'Lower Portion', icon: <MdArrowDownward /> },
    { id: 'room', label: 'Room', icon: <FaBed /> },
    { id: 'farmhouse', label: 'Farm House', icon: <MdHouse /> }
  ];

  const handleNext = () => {
    if (selectedType) {
      navigate('/listing-flow/step-1/2_basicinfo');
    }
  };

  const handlePropertySelect = (typeId) => {
    setSelectedType(typeId);
    setDraft(d => ({ ...d, propertyType: typeId })); 
  };

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.content}>
        <h1 className={commonStyles.stepTitle}>Which of these best describes your property?</h1>

        <div className={commonStyles.cardGrid}>
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              className={`${commonStyles.card} ${selectedType === type.id ? commonStyles.selected : ''}`}
              onClick={() => handlePropertySelect(type.id)}
            >
              <span className={commonStyles.cardIcon}>{type.icon}</span>
              <span className={commonStyles.cardLabel}>{type.label}</span>
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
