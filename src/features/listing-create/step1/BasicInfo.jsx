import React, { useState, useEffect } from 'react';
import { useListingDraft } from '../../../context/ListingDraftProvider';  
import styles from './BasicInfo.module.css';
import commonStyles from './ListingFlowCommon.module.css'; 
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';

// New Counter component
const Counter = ({ label, value, onIncrement, onDecrement }) => (
  <div className={styles.counterItem}>
    <span className={styles.label}>{label}</span>
    <div className={styles.counterControls}>
      <button 
        onClick={onDecrement} 
        className={styles.counterButton}
        disabled={value <= 1}
      >
        −
      </button>
      <span className={styles.counterValue}>{value}</span>
      <button 
        onClick={onIncrement} 
        className={styles.counterButton}
      >
        +
      </button>
    </div>
  </div>
);

const BasicInfo = () => {
  const navigate = useNavigate();
  const { draft, setDraft } = useListingDraft(); 
  const [formData, setFormData] = useState({
    bedrooms: draft.bedrooms || 1,
    bathrooms: draft.bathrooms || 1,
    totalArea: draft.totalArea || '',
    areaUnit: draft.areaUnit || 'Sq Ft'
  });

  const handleNext = () => {
    navigate('/listing-flow/step-1/3_address');
  };

  const handleCounter = (field, increment) => {
    setFormData(prev => ({
      ...prev,
      [field]: increment
        ? prev[field] + 1
        : Math.max(1, prev[field] - 1)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Update draft whenever formData changes
  useEffect(() => {
    setDraft(draft => ({
      ...draft,
      ...formData
    }));
  }, [formData, setDraft]);

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.content}>
        <h1 className={commonStyles.stepTitle}>Share some basics about your property</h1>
        <p className={commonStyles.stepSubtitle}>We'll ask you for details a little later.</p>

        <div className={styles.counters}>
          <div className={styles.counterItem}>
            <span className={styles.label}>Total Area</span>
            <div className={styles.counterControls}>
              <input
                type="text"
                name="totalArea"
                value={formData.totalArea}
                onChange={handleInputChange}
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="Area"
              />
              <select
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleInputChange}
              >
                <option value="Sq Ft">Sq Ft</option>
                <option value="Marlas">Marlas</option>
                <option value="Kanals">Kanals</option>
              </select>
            </div>
          </div>

          <Counter 
            label="Bedrooms"
            value={formData.bedrooms}
            onIncrement={() => handleCounter('bedrooms', true)}
            onDecrement={() => handleCounter('bedrooms', false)}
          />

          <Counter 
            label="Bathrooms"
            value={formData.bathrooms}
            onIncrement={() => handleCounter('bathrooms', true)}
            onDecrement={() => handleCounter('bathrooms', false)}
          />
        </div>

        <NavigationButtons 
          onNext={handleNext}
          onBack={() => navigate('/listing-flow/step-1/1_proptype')}
          disableNext={!formData.totalArea}
        />
      </div>
    </div>
  );
};

export default BasicInfo;
