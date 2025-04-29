import React from 'react';
import styles from './Step2Intro.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';

const Step2Intro = () => {
  const navigate = useNavigate();   

  const handleNext = () => {
    navigate('/listing-flow/step-2/1_photos');
  };

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.content}>
        <h2 className={styles.stepLabel}>Step 2</h2>
        <h1 className={commonStyles.stepTitle}>Make your place stand out</h1>
        <p className={commonStyles.stepSubtitle}>
          In this step, you'll add some of the amenities your place offers, plus 5 or more photos. Then, you'll create a title and description.
        </p>
      </div>

      <NavigationButtons 
        onNext={handleNext}
        disableNext={false}
      />
    </div>
  );
};

export default Step2Intro; 