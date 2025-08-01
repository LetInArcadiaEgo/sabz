import React, { useState } from 'react';
import { useListingDraft } from '../../../context/ListingDraftProvider'; 
import styles from './Description.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';

const Description = () => {
  const navigate = useNavigate();
  const { draft, setDraft } = useListingDraft();   
  const [description, setDescription] = useState(draft.description || '');

  const handleNext = () => {
    navigate('/listing-flow/step-2/price');
  };

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.content}>
        <h1 className={commonStyles.stepTitle}>Next, let's describe your house</h1>
        <p className={commonStyles.stepSubtitle}>
          Write a description that highlights the best features of your property.
        </p>

        <textarea
          value={description}
          onChange={(e) => {
            const v = e.target.value;
            setDescription(v);
            setDraft(d => ({ ...d, description: v }));                    // 🆕 save
          }}
          placeholder="This well-maintained property features modern amenities and a convenient location."
          className={styles.descriptionInput}
          maxLength={500}
        />
        <div className={styles.charCount}>{description.length}/500</div>
      </div>

      <NavigationButtons 
        onNext={handleNext}
        onBack={() => navigate('/listing-flow/step-2/title')}
        disableNext={!description.trim()}
      />
    </div>
  );
};

export default Description; 