import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EditListing.module.css';
import ExitButton from '../../components/common/Button/ExitButton';

// Import card components in new order
import PhotosCard from './EditCards/01_PhotosCard/PhotosCard';
import PriceCard from './EditCards/02_PriceCard/PriceCard';
import TitleCard from './EditCards/03_TitleCard/TitleCard';
import PropertyTypeCard from './EditCards/04_PropertyTypeCard/PropertyTypeCard';
import BasicInfoCard from './EditCards/05_BasicInfoCard/BasicInfoCard';
import LocationCard from './EditCards/06_LocationCard/LocationCard';
import AmenitiesCard from './EditCards/07_AmenitiesCard/AmenitiesCard';

const EditListingPage = () => {
  const { id } = useParams();
  const [activeModal, setActiveModal] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Initial state populated with mock data
  const [listing, setListing] = useState({
    photos: ['/images/house1.jpg'],
    title: 'Modern Family Home',
    description: 'A beautiful modern house with spacious rooms and stunning views. Perfect for families looking for comfort and luxury.',
    propertyType: {
      place: 'House',
      type: 'Entire place'
    },
    basicInfo: {
      bedrooms: 4,
      beds: 5,
      bathrooms: 3,
      totalArea: 2500,
      areaUnit: 'Sq Ft'
    },
    price: {
      base: 2500000,
      weeklyDiscount: 10,
      monthlyDiscount: 20
    },
    address: {
      street: '',
      unit: '',
      city: 'Lahore',
      state: 'Punjab',
      zipCode: '',
      country: 'Pakistan'
    },
    amenities: [
      'power',
      'internet',
      'ac',
      'parking'
    ],
    locationDetails: 'Lahore, Punjab'
  });

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

  const handleSave = (field, value) => {
    setListing(prev => ({
      ...prev,
      [field]: value
    }));
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
    // Here you would typically make an API call to save all changes
    // For now, we'll just update the listing state
    setListing(prev => ({
      ...prev,
      ...tempChanges
    }));
    setTempChanges({});
    setHasUnsavedChanges(false);
  };

  const handleDiscardAll = () => {
    setTempChanges({});
    setHasUnsavedChanges(false);
  };

  return (
    <div className={styles.container}>
      <ExitButton />
      <div className={styles.headerContent}>
        <h1 className={styles.title}>Edit Listing</h1>
        <p className={styles.subtitle}>
          Editing listing #{id}
          {hasUnsavedChanges && <span className={styles.unsavedChanges}> (Unsaved changes)</span>}
        </p>
      </div>

      <PhotosCard
        photos={listing.photos}
        isModalOpen={activeModal === 'photos'}
        onModalOpen={() => setActiveModal('photos')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempPhotos={tempChanges.photos}
        onPhotosChange={(photos) => setTempChanges(prev => ({ ...prev, photos }))}
      />

      <PriceCard
        price={listing.price}
        isModalOpen={activeModal === 'price'}
        onModalOpen={() => setActiveModal('price')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempPrice={tempChanges.price}
        onPriceChange={(price) => setTempChanges(prev => ({ ...prev, price }))}
      />

      <TitleCard
        title={listing.title}
        isModalOpen={activeModal === 'title'}
        onModalOpen={() => setActiveModal('title')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempTitle={tempChanges.title}
        onTitleChange={(title) => setTempChanges(prev => ({ ...prev, title }))}
      />

      <PropertyTypeCard
        propertyType={listing.propertyType}
        isModalOpen={activeModal === 'propertyType'}
        onModalOpen={() => setActiveModal('propertyType')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempPropertyType={tempChanges.propertyType}
        onPropertyTypeChange={(propertyType) => setTempChanges(prev => ({ ...prev, propertyType }))}
      />

      <BasicInfoCard
        basicInfo={listing.basicInfo}
        isModalOpen={activeModal === 'basicInfo'}
        onModalOpen={() => setActiveModal('basicInfo')}
        onModalClose={handleCancel}
        onSave={handleSave}
        tempBasicInfo={tempChanges.basicInfo}
        onBasicInfoChange={(basicInfo) => setTempChanges(prev => ({ ...prev, basicInfo }))}
      />

      <LocationCard
        address={listing.address}
        locationDetails={listing.locationDetails}
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
        amenities={listing.amenities}
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
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default EditListingPage; 