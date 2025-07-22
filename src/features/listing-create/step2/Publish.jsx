import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useListingDraft } from '../../../context/ListingDraftProvider';
import { createListing } from '../../../api';

import styles from './Publish.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';

import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';
import ListingMainInfo from '../../../pages/listing/components/ListingMainInfo/ListingMainInfo';
import ListingFeatures from '../../../pages/listing/components/ListingFeatures/ListingFeatures';

const Publish = () => {
  const navigate = useNavigate();
  const { draft } = useListingDraft();
  const [submitting, setSubmitting] = useState(false);

  const handlePublish = async () => {
    try {
      setSubmitting(true);
      await createListing(draft);          // 🎯 POST to your Replit backend
      alert('Submitted!  Listing will appear once approved.');
      navigate('/listing-flow/success');
    } catch (err) {
      console.error(err);
      alert('Sorry, something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <ExitButton />

      <h1 className={commonStyles.stepTitle}>Your listing</h1>
      <p className={commonStyles.stepSubtitle}>Review your listing before publishing</p>

      {/* preview card — still hard-coded image for now */}
      <div className={styles.content}>
        <div className={styles.listingCard}>
          <div className={styles.imageContainer}>
            <img
              src="/images/house1.jpg"
              alt="preview"
              className={styles.propertyImage}
            />
          </div>

          <div className={styles.cardContent}>
            <ListingMainInfo
              price={draft.price}
              title={draft.title}
              locationDetails="Lahore, Punjab"
            />
            <ListingFeatures
              squareFootage={draft.totalArea ? `${draft.totalArea} ${draft.areaUnit}` : undefined}
              bedrooms={draft.bedrooms}
              bathrooms={draft.bathrooms}
            />
            <p className={styles.propertyDescription}>{draft.description}</p>
          </div>
        </div>
      </div>

      <NavigationButtons
        onNext={handlePublish}
        nextText={submitting ? 'Publishing…' : 'Publish'}
        disabled={submitting}
      />
    </div>
  );
};

export default Publish;