import React, { useState, useEffect } from 'react';
import styles from './Title.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';
import { useListingDraft } from '../../../context/ListingDraftProvider';

const Title = () => {
  const navigate = useNavigate();
  const { draft, setDraft } = useListingDraft();
  const [title, setTitle] = useState(draft.title || '');

  // keep local state in sync if context changes (rare)
  useEffect(() => {
    setTitle(draft.title || '');
  }, [draft.title]);

  const handleNext = () => {
    navigate('/listing-flow/step-2/description');
  };

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.content}>
        <h1 className={commonStyles.stepTitle}>Now, let's give your property a title</h1>
        <p className={commonStyles.stepSubtitle}>
          You can always come back and change this later!
        </p>

        <div className={styles.inputContainer}>
          <textarea
            value={title}
            onChange={(e) => {
              const v = e.target.value;
              setTitle(v);
              setDraft(d => ({ ...d, title: v }));
            }}
            placeholder="The House!"
            className={styles.titleInput}
            maxLength={32}
          />
          <div className={styles.charCount}>{title.length}/32</div>
        </div>
      </div>

      <NavigationButtons 
        onNext={handleNext}
        onBack={() => navigate('/listing-flow/step-2/1_photos')}
        disableNext={!title.trim()}
      />
    </div>
  );
};

export default Title; 