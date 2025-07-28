import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EditListing.module.css';
import ExitButton from '../../components/common/Button/ExitButton';
import { useListing } from '../../hooks/useListing';
import { updateListing, uploadPhotos } from '../../api';

// Import card components in new order
import PhotosCard from './EditCards/01_PhotosCard/PhotosCard';
import PriceCard from './EditCards/02_PriceCard/PriceCard';
import TitleCard from './EditCards/03_TitleCard/TitleCard';
import PropertyTypeCard from './EditCards/04_PropertyTypeCard/PropertyTypeCard';
import BasicInfoCard from './EditCards/05_BasicInfoCard/BasicInfoCard';
import LocationCard from './EditCards/06_LocationCard/LocationCard';
import AmenitiesCard from './EditCards/07_AmenitiesCard/AmenitiesCard';
import DescriptionCard from './EditCards/08_DescriptionCard/DescriptionCard';

const EditListingPage = () => {
  const { id } = useParams();
  const [activeModal, setActiveModal] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch the real listing data (Phase 3)
  const { listing: fetchedListing, loading, error } = useListing(id);

  // Local editable copy of the listing
  const [listing, setListing] = useState(null);

  // Sync fetched data into local state when ready
  useEffect(() => {
    if (fetchedListing) {
      setListing(fetchedListing);
    }
  }, [fetchedListing]);

  // Keep track of temporary changes
  const [tempChanges, setTempChanges] = useState({});

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

  // Ensure nested shape compatibility with existing EditCards
  const normalizedListing = useMemo(() => {
    if (!listing) return listing;

    // Photos – backend may store `images` or `image`
    const photosArray = Array.isArray(listing.photos)
      ? listing.photos
      : Array.isArray(listing.images)
        ? listing.images
        : (listing.image ? [listing.image] : []);

    // Property type – now just use the string ID directly
    const propertyTypeVal = listing.propertyType || listing.property_type;
    const propertyType = typeof propertyTypeVal === 'string'
      ? propertyTypeVal
      : (propertyTypeVal?.place || 'house');

    // Basic info – group related fields
    const basicInfoObj = listing.basicInfo || {
      bedrooms:   listing.bedrooms   ?? 1,
      bathrooms:  listing.bathrooms  ?? 1,
      totalArea:  (listing.totalArea ?? listing.total_area) ?? '',
      areaUnit:   (listing.areaUnit  ?? listing.area_unit)  ?? 'Sq Ft',
    };

    // Address – ensure nested keys exist
    const addressObj = {
      street:    listing.address?.streetAddress || listing.address?.street || '', 
      unit:      listing.address?.aptFloorBldg  || listing.address?.unit  || '',
      city:      listing.address?.city      || '',
      state:     listing.address?.state     || '',
      zipCode:   listing.address?.postalCode|| listing.address?.zipCode || '',
      country:   listing.address?.country   || 'Pakistan',
    };

    // Price – convert primitive to object form
    const priceObject = typeof listing.price === 'number'
      ? { base: listing.price, weeklyDiscount: 0, monthlyDiscount: 0 }
      : (listing.price || { base: 0, weeklyDiscount: 0, monthlyDiscount: 0 });

    return {
      ...listing,
      photos: photosArray,
      propertyType: propertyType,
      basicInfo: basicInfoObj,
      address: addressObj,
      amenities: listing.amenities || [],
      price: priceObject,
    };
  }, [listing]);

  // Merge persisted data with any in-progress edits so hooks remain in order
  const displayListing = useMemo(
    () => ({
      ...normalizedListing,
      ...tempChanges,
    }),
    [normalizedListing, tempChanges]
  );

  // Early return for loading / error states (after hooks)
  if (loading || !normalizedListing) {
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

  const handleSave = (field, value) => {
    // 🔍 Debug: track individual field edits
    // eslint-disable-next-line no-console
    console.log(`[EditListing] temp change → ${field}:`, value);
    setTempChanges(prev => ({
      ...prev,
      [field]: value
    }));
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
      const changes = { ...tempChanges };

      // Photo uploads (new File objects → URLs)
      if (changes.photos) {
        const files = [];
        const urls  = [];

        changes.photos.forEach((p) => {
          if (typeof p === 'string') {
            urls.push(p);
          } else if (p && typeof p === 'object') {
            if (p.file instanceof File) {
              // New local file — upload it, don't keep local preview URL
              files.push(p.file);
            } else if (typeof p.url === 'string') {
              // Existing remote image already saved
              urls.push(p.url);
            }
          }
        });
        // eslint-disable-next-line no-console
        console.log('[EditListing] photos before upload', { files, urls });

        if (files.length) {
          const newUrls = await uploadPhotos(id, files);
          // eslint-disable-next-line no-console
          console.log('[EditListing] uploaded URLs', newUrls);
          urls.push(...newUrls);
        }

        changes.photos = urls; // all strings
      }

      // eslint-disable-next-line no-console
      console.log('[EditListing] final changes payload', changes);

      await updateListing(id, changes).then(() => {
        // eslint-disable-next-line no-console
        console.log('[EditListing] updateListing OK');
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.error('[EditListing] updateListing error', err);
        throw err;
      });
      setListing(prev => ({
        ...prev,
        ...changes,
      }));
      setTempChanges({});
      setHasUnsavedChanges(false);
      setSaving(false);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err.message || 'Failed to save changes');
      setSaving(false);
    }
  };

  const handleDiscardAll = () => {
    setTempChanges({});
    setHasUnsavedChanges(false);
  };

  return (
    <div className={styles.container}>
      <ExitButton to="/my-listings" />
      <div className={styles.headerContent}>
        <h1 className={styles.title}>Edit Listing</h1>
        <p className={styles.subtitle}>
          Editing listing #{id}
          {hasUnsavedChanges && <span className={styles.unsavedChanges}> (Unsaved changes)</span>}
        </p>
      </div>

      <PhotosCard
        photos={displayListing.photos}
        isModalOpen={activeModal === 'photos'}
        onModalOpen={() => setActiveModal('photos')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempPhotos={tempChanges.photos}
        onPhotosChange={(photos) => setTempChanges(prev => ({ ...prev, photos }))}
      />

      <PriceCard
        price={displayListing.price}
        isModalOpen={activeModal === 'price'}
        onModalOpen={() => setActiveModal('price')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempPrice={tempChanges.price}
        onPriceChange={(price) => setTempChanges(prev => ({ ...prev, price }))}
      />

      <TitleCard
        title={displayListing.title}
        isModalOpen={activeModal === 'title'}
        onModalOpen={() => setActiveModal('title')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempTitle={tempChanges.title}
        onTitleChange={(title) => setTempChanges(prev => ({ ...prev, title }))}
      />

      <DescriptionCard
        description={displayListing.description}
        isModalOpen={activeModal === 'description'}
        onModalOpen={() => setActiveModal('description')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempDescription={tempChanges.description}
        onDescriptionChange={(description) => setTempChanges(prev => ({ ...prev, description }))}
      />

      <PropertyTypeCard
        propertyType={displayListing.propertyType}
        isModalOpen={activeModal === 'propertyType'}
        onModalOpen={() => setActiveModal('propertyType')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempPropertyType={tempChanges.propertyType}
        onPropertyTypeChange={(propertyType) => setTempChanges(prev => ({ ...prev, propertyType }))}
      />

      <BasicInfoCard
        basicInfo={displayListing.basicInfo}
        isModalOpen={activeModal === 'basicInfo'}
        onModalOpen={() => setActiveModal('basicInfo')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempBasicInfo={tempChanges.basicInfo}
        onBasicInfoChange={(basicInfo) => setTempChanges(prev => ({ ...prev, basicInfo }))}
      />

      <LocationCard
        address={displayListing.address}
        locationDetails={displayListing.locationDetails}
        isModalOpen={activeModal === 'address'}
        onModalOpen={() => setActiveModal('address')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempAddress={tempChanges.address}
        onAddressChange={(address) => setTempChanges(prev => ({ ...prev, address }))}
        tempLocationDetails={tempChanges.locationDetails}
        onLocationDetailsChange={(locationDetails) => setTempChanges(prev => ({ ...prev, locationDetails }))}
      />

      <AmenitiesCard
        amenities={displayListing.amenities}
        isModalOpen={activeModal === 'amenities'}
        onModalOpen={() => setActiveModal('amenities')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempAmenities={tempChanges.amenities}
        onAmenitiesChange={(amenities) => setTempChanges(prev => ({ ...prev, amenities }))}
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

export default EditListingPage; 