import React from 'react';
import styles from './Publish.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';
import ListingMainInfo from '../../../pages/listing/components/ListingMainInfo/ListingMainInfo';
import ListingFeatures from '../../../pages/listing/components/ListingFeatures/ListingFeatures';

const Publish = () => {
  const navigate = useNavigate();

  const handlePublish = () => {
    // Handle publish logic here
    navigate('/listing-flow/success');
  };

  return (
    <div className={styles.container}>
      <ExitButton />

      <h1 className={commonStyles.stepTitle}>Your listing</h1>
      <p className={commonStyles.stepSubtitle}>
        Review your listing before publishing
      </p>

      <div className={styles.content}>
        <div className={styles.listingCard}>
          <div className={styles.imageContainer}>
            <img 
              src="/images/house1.jpg" 
              alt="Modern house with spacious rooms" 
              className={styles.propertyImage}
            />
          </div>

          <div className={styles.cardContent}>
            <ListingMainInfo 
              price={2500000}
              title="The House!"
              locationDetails="Lahore, Punjab"
            />
            <ListingFeatures 
              squareFootage="2500 sqft"
              bedrooms={4}
              bathrooms={3}
            />
            <p className={styles.propertyDescription}>
              A beautiful modern house with spacious rooms and stunning views. 
              Perfect for families looking for comfort and luxury.
            </p>
          </div>
        </div>
      </div>

      <NavigationButtons 
        onNext={handlePublish}
        nextText="Publish"
      />
    </div>
  );
};

export default Publish; 