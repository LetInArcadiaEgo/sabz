import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EditListing.module.css';
import EditModal from '../../components/common/EditModal/EditModal';
import Counter from '../../components/common/Counter/Counter';
import PhotoManager from '../../components/common/PhotoManager/PhotoManager';

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
    maxGuests: 8,
    floors: {
      total: 2,
      listingFloor: 1
    },
    locationDetails: 'Lahore, Punjab'
  });

  // Keep track of temporary changes
  const [tempChanges, setTempChanges] = useState({});

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

  const renderEditCard = (title, content, modalType) => (
    <div 
      className={styles.editCard} 
      onClick={() => setActiveModal(modalType)}
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardContent}>{content}</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Listing</h1>
      <p className={styles.subtitle}>
        Editing listing #{id}
        {hasUnsavedChanges && <span className={styles.unsavedChanges}> (Unsaved changes)</span>}
      </p>

      {/* Photos Card */}
      {renderEditCard(
        'Photos',
        `${listing.photos.length} photos`,
        'photos'
      )}

      {/* Title Card */}
      {renderEditCard(
        'Title',
        listing.title,
        'title'
      )}

      {/* Property Type Card */}
      {renderEditCard(
        'Property type',
        `${listing.propertyType.type} · ${listing.propertyType.place}`,
        'propertyType'
      )}

      {/* Floors Card */}
      {renderEditCard(
        'Floor Information',
        `Floor ${listing.floors.listingFloor} of ${listing.floors.total}`,
        'floors'
      )}

      {/* Basic Info Card */}
      {renderEditCard(
        'Basic Information',
        `${listing.basicInfo.bedrooms} bedrooms · ${listing.basicInfo.beds} beds · ${listing.basicInfo.bathrooms} baths · ${listing.basicInfo.totalArea} ${listing.basicInfo.areaUnit}`,
        'basicInfo'
      )}

      {/* Price Card */}
      {renderEditCard(
        'Pricing',
        `PKR ${listing.price.base.toLocaleString()}`,
        'price'
      )}

      {/* Address Card */}
      {renderEditCard(
        'Location',
        listing.locationDetails || 'Add location details',
        'address'
      )}

      {/* Amenities Card */}
      {renderEditCard(
        'Amenities',
        `${listing.amenities.length} selected`,
        'amenities'
      )}

      {/* Guest Limit Card */}
      {renderEditCard(
        'Maximum guests',
        `${listing.maxGuests} guests`,
        'guests'
      )}

      {/* Basic Info Modal */}
      <EditModal
        isOpen={activeModal === 'basicInfo'}
        onClose={handleCancel}
        onSave={() => handleSave('basicInfo', tempChanges.basicInfo || listing.basicInfo)}
        title="Basic Information"
        initialData={listing.basicInfo}
      >
        <Counter
          label="Bedrooms"
          value={(tempChanges.basicInfo || listing.basicInfo).bedrooms}
          onChange={(value) => setTempChanges(prev => ({
            ...prev,
            basicInfo: {
              ...(prev.basicInfo || listing.basicInfo),
              bedrooms: value
            }
          }))}
          minValue={1}
        />
        <Counter
          label="Beds"
          value={(tempChanges.basicInfo || listing.basicInfo).beds}
          onChange={(value) => setTempChanges(prev => ({
            ...prev,
            basicInfo: {
              ...(prev.basicInfo || listing.basicInfo),
              beds: value
            }
          }))}
          minValue={1}
        />
        <Counter
          label="Bathrooms"
          value={(tempChanges.basicInfo || listing.basicInfo).bathrooms}
          onChange={(value) => setTempChanges(prev => ({
            ...prev,
            basicInfo: {
              ...(prev.basicInfo || listing.basicInfo),
              bathrooms: value
            }
          }))}
          minValue={1}
        />
      </EditModal>

      {/* Guest Limit Modal */}
      <EditModal
        isOpen={activeModal === 'guests'}
        onClose={handleCancel}
        onSave={() => handleSave('maxGuests', tempChanges.maxGuests || listing.maxGuests)}
        title="Maximum number of guests"
        initialData={listing.maxGuests}
      >
        <Counter
          value={tempChanges.maxGuests || listing.maxGuests}
          onChange={(value) => setTempChanges(prev => ({
            ...prev,
            maxGuests: value
          }))}
          minValue={1}
        />
      </EditModal>

      {/* Property Type Modal */}
      <EditModal
        isOpen={activeModal === 'propertyType'}
        onClose={handleCancel}
        onSave={() => handleSave('propertyType', tempChanges.propertyType || listing.propertyType)}
        title="Property type"
        initialData={listing.propertyType}
      >
        <div className={styles.propertyTypeInputs}>
          <div className={styles.inputGroup}>
            <label>Place Type</label>
            <select
              value={(tempChanges.propertyType || listing.propertyType).place}
              onChange={(e) => setTempChanges(prev => ({
                ...prev,
                propertyType: {
                  ...(prev.propertyType || listing.propertyType),
                  place: e.target.value
                }
              }))}
            >
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Condo">Condo</option>
            </select>
          </div>
          
          <div className={styles.inputGroup}>
            <label>Rental Type</label>
            <select
              value={(tempChanges.propertyType || listing.propertyType).type}
              onChange={(e) => setTempChanges(prev => ({
                ...prev,
                propertyType: {
                  ...(prev.propertyType || listing.propertyType),
                  type: e.target.value
                }
              }))}
            >
              <option value="Entire place">Entire place</option>
              <option value="Private room">Private room</option>
              <option value="Shared room">Shared room</option>
            </select>
          </div>
        </div>
      </EditModal>

      {/* Photos Modal */}
      <EditModal
        isOpen={activeModal === 'photos'}
        onClose={handleCancel}
        onSave={() => handleSave('photos', tempChanges.photos || listing.photos)}
        title="Manage Photos"
        initialData={listing.photos}
      >
        <PhotoManager
          photos={tempChanges.photos || listing.photos}
          onChange={(photos) => setTempChanges(prev => ({
            ...prev,
            photos
          }))}
        />
      </EditModal>
    </div>
  );
};

export default EditListingPage; 