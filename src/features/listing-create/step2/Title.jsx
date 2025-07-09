import React, { useState } from 'react';
import styles from './Title.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';

const Title = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

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
            onChange={(e) => setTitle(e.target.value)}
            placeholder="The House!"
            className={styles.titleInput}
            maxLength={32}
          />
          <div className={styles.charCount}>{title.length}/32</div>
        </div>
      </div>

      <NavigationButtons 
        onNext={handleNext}
        disableNext={!title.trim()}
      />
    </div>
  );
};

export default Title; 