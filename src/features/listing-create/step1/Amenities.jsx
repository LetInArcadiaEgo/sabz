import React, { useState, useEffect } from 'react';
import { useListingDraft } from '../../../context/ListingDraftProvider'; 
import styles from './Amenities.module.css';
import commonStyles from './ListingFlowCommon.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';
import { AMENITIES } from '../../../components/common/data/amenities';

const Amenities = () => {
  const navigate = useNavigate();
  const { setDraft } = useListingDraft();     // write amenities into shared draft
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenities = AMENITIES.map((item) => ({
    ...item,
    icon: React.createElement(item.icon)
  }));

  const handleNext = () => {
    navigate('/listing-flow/step-2/intro');
  };

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  // Update draft whenever selectedAmenities changes
  useEffect(() => {
    setDraft(draft => ({
      ...draft,
      amenities: selectedAmenities
    }));
  }, [selectedAmenities, setDraft]);

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.content}>
        <h1 className={commonStyles.stepTitle}>What amenities does your property have?</h1>
        <p className={commonStyles.stepSubtitle}>Select all the amenities available at your property.</p>

        <div className={styles.section}>
          <div className={commonStyles.cardGrid}>
            {amenities.map((amenity) => (
              <button
                key={amenity.id}
                className={`${commonStyles.card} ${selectedAmenities.includes(amenity.id) ? commonStyles.selected : ''}`}
                onClick={() => toggleAmenity(amenity.id)}
              >
                <span className={commonStyles.cardIcon}>{amenity.icon}</span>
                <span className={commonStyles.cardLabel}>{amenity.label}</span>
              </button>
            ))}
          </div>
        </div>

        <NavigationButtons 
          onNext={handleNext}
          disableNext={false}
        />
      </div>
    </div>
  );
};

export default Amenities; 