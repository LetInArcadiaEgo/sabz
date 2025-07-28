import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useListingDraft } from '../../../context/ListingDraftProvider';
import { createListing } from '../../../api';

import styles from './Publish.module.css';
import commonStyles from '../step1/ListingFlowCommon.module.css';

import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';
import PreviewListingCard from '../PreviewListingCard';

const Publish = () => {
  const navigate = useNavigate();
  const { draft } = useListingDraft();
  const [submitting, setSubmitting] = useState(false);

  const handlePublish = async () => {
    try {
      setSubmitting(true);
      await createListing(draft);
      alert('Submitted!  Listing will appear once approved.');
      navigate('/listing-flow/success');
    } catch (err) {
      // eslint-disable-next-line no-console
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

      <div className={styles.content}>
        <PreviewListingCard draft={draft} />
      </div>

      <NavigationButtons
        onNext={handlePublish}
        nextLabel={submitting ? 'Publishing…' : 'Publish'}
        disableNext={submitting}
      />
    </div>
  );
};

export default Publish;