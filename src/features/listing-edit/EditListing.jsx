import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EditListing.module.css';
import ExitButton from '../../components/common/Button/ExitButton';
import { useListing } from '../../hooks/useListing';
import { updateListing, uploadPhotos } from '../../api';
import { ListingDraftProvider, useListingDraft } from '../../context/ListingDraftProvider';

// Import card components in new order
import PhotosCard from './EditCards/01_PhotosCard/PhotosCard';
import PriceCard from './EditCards/02_PriceCard/PriceCard';
import TitleCard from './EditCards/03_TitleCard/TitleCard';
import PropertyTypeCard from './EditCards/04_PropertyTypeCard/PropertyTypeCard';
import BasicInfoCard from './EditCards/05_BasicInfoCard/BasicInfoCard';
import LocationCard from './EditCards/06_LocationCard/LocationCard';
import AmenitiesCard from './EditCards/07_AmenitiesCard/AmenitiesCard';
import DescriptionCard from './EditCards/08_DescriptionCard/DescriptionCard';

const EditListingContent = () => {
  const { id } = useParams();
  const [activeModal, setActiveModal] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const { draft, setDraft } = useListingDraft();

  // Add effect to handle beforeunload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSave = (field, value) => {
    // Handle multiple field updates (from BasicInfoCard)
    if (typeof field === 'object') {
      setDraft(prev => ({
        ...prev,
        ...field
      }));
    } else {
      setDraft(prev => ({
        ...prev,
        [field]: value
      }));
    }
    setHasUnsavedChanges(true);
    setActiveModal(null);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };

  const handleSaveAll = async () => {
    if (!hasUnsavedChanges) return;

    try {
      setSaving(true);
      const changes = { ...draft };

      // Photo uploads (new File objects → URLs)
      if (changes.photos) {
        const files = [];
        const urls  = [];

        changes.photos.forEach((p) => {
          if (typeof p === 'string') {
            urls.push(p);
          } else if (p && typeof p === 'object') {
            if (p.file instanceof File) {
              files.push(p.file);
            } else if (typeof p.url === 'string') {
              urls.push(p.url);
            }
          }
        });

        if (files.length) {
          const newUrls = await uploadPhotos(id, files);
          urls.push(...newUrls);
        }

        changes.photos = urls;
      }

      await updateListing(id, changes);
      setHasUnsavedChanges(false);
      setSaving(false);
    } catch (err) {
      alert(err.message || 'Failed to save changes');
      setSaving(false);
    }
  };

  const handleDiscardAll = () => {
    setHasUnsavedChanges(false);
    // Reset draft to original? For now just clear the flag
  };

  if (!draft) {
    return (
      <div className={styles.container}>
        <h1>Loading listing…</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ExitButton to="/my-listings" />
      <div className={styles.headerContent}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Edit Listing</h1>
          {hasUnsavedChanges && (
            <div className={styles.unsavedBadge}>
              <span className={styles.unsavedDot}></span>
              Unsaved Changes
            </div>
          )}
        </div>
      </div>

      <PhotosCard
        photos={draft.photos}
        isModalOpen={activeModal === 'photos'}
        onModalOpen={() => setActiveModal('photos')}
        onModalClose={handleCancel}
        onSave={handleSave}
      />

      <PriceCard
        price={draft.price}
        isModalOpen={activeModal === 'price'}
        onModalOpen={() => setActiveModal('price')}
        onModalClose={handleCancel}
        onSave={handleSave}
      />

      <TitleCard
        title={draft.title}
        isModalOpen={activeModal === 'title'}
        onModalOpen={() => setActiveModal('title')}
        onModalClose={handleCancel}
        onSave={handleSave}
      />

      <DescriptionCard
        description={draft.description}
        isModalOpen={activeModal === 'description'}
        onModalOpen={() => setActiveModal('description')}
        onModalClose={handleCancel}
        onSave={handleSave}
      />

      <PropertyTypeCard
        propertyType={draft.propertyType}
        isModalOpen={activeModal === 'propertyType'}
        onModalOpen={() => setActiveModal('propertyType')}
        onModalClose={handleCancel}
        onSave={handleSave}
      />

      <BasicInfoCard
        bedrooms={draft.bedrooms}
        bathrooms={draft.bathrooms}
        totalArea={draft.totalArea}
        areaUnit={draft.areaUnit}
        isModalOpen={activeModal === 'basicInfo'}
        onModalOpen={() => setActiveModal('basicInfo')}
        onModalClose={handleCancel}
        onSave={handleSave}
      />

      <LocationCard
        address={draft.address}
        isModalOpen={activeModal === 'address'}
        onModalOpen={() => setActiveModal('address')}
        onModalClose={handleCancel}
        onSave={handleSave}
      />

      <AmenitiesCard
        amenities={draft.amenities}
        isModalOpen={activeModal === 'amenities'}
        onModalOpen={() => setActiveModal('amenities')}
        onModalClose={handleCancel}
        onSave={handleSave}
      />

      <div className={`${styles.saveBar} ${hasUnsavedChanges ? styles.saveBarVisible : ''}`}>
        <button 
          className={`${styles.saveButton} ${styles.secondary}`}
          onClick={handleDiscardAll}
        >
          Discard Changes
        </button>
        <button 
          className={`${styles.saveButton} ${styles.primary}`}
          onClick={handleSaveAll}
          disabled={!hasUnsavedChanges || saving}
        >
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
};

const EditListingPage = () => {
  const { id } = useParams();
  const { data: listing, isLoading, error } = useListing(id);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1>Loading listing…</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1>Error: {error}</h1>
      </div>
    );
  }

  return (
    <ListingDraftProvider initialDraft={listing}>
      <EditListingContent />
    </ListingDraftProvider>
  );
};

export default EditListingPage; 