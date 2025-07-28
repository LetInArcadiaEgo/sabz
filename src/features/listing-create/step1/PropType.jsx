import React, { useState } from 'react';
import { useListingDraft } from '../../../context/ListingDraftProvider';
import styles from './PropType.module.css';
import commonStyles from './ListingFlowCommon.module.css'; 
import { useNavigate } from 'react-router-dom';
// Icon components are referenced via shared data file
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';
import { PROPERTY_TYPES } from '../../../components/common/data/propertyTypes';

const PropType = () => {
  const navigate = useNavigate();
  const { setDraft } = useListingDraft();
  const [selectedType, setSelectedType] = useState(null);

  // propertyTypes now comes from shared constants
  const propertyTypes = PROPERTY_TYPES.map((item) => ({
    ...item,
    icon: React.createElement(item.icon),
  }));

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
