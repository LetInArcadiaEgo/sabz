import React from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './LocationCard.module.css';

const LocationForm = ({ value, onChange }) => {
  const address = value || {};

  const handleInputChange = (field, newValue) => {
    onChange({
      ...address,
      [field]: newValue
    });
  };

  return (
    <div className={styles.content}>
      <div className={styles.formGroup}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={address.street || ''}
            onChange={(e) => handleInputChange('street', e.target.value)}
            placeholder=" "
            className={styles.input}
          />
          <label className={styles.label}>Street address</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={address.unit || ''}
            onChange={(e) => handleInputChange('unit', e.target.value)}
            placeholder=" "
            className={styles.input}
          />
          <label className={styles.label}>Apt, floor, bldg (if applicable)</label>
        </div>

        <div className={styles.inputContainer}>
          <select
            value={address.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={styles.countrySelect}
          >
            <option value="" disabled>Select city</option>
            <option value="Lahore">Lahore</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Multan">Multan</option>
            <option value="Gujranwala">Gujranwala</option>
            <option value="Sialkot">Sialkot</option>
            <option value="Bahawalpur">Bahawalpur</option>
            <option value="Sargodha">Sargodha</option>
            <option value="Sheikhupura">Sheikhupura</option>
            <option value="Gujrat">Gujrat</option>
          </select>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={address.state || ''}
            onChange={(e) => handleInputChange('state', e.target.value)}
            placeholder=" "
            className={styles.input}
          />
          <label className={styles.label}>Area (DHA, Gulberg, Lake City, etc.)</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={address.zipCode || ''}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder=" "
            className={styles.input}
          />
          <label className={styles.label}>Postal code (if applicable)</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={address.country || 'Pakistan'}
            onChange={(e) => handleInputChange('country', e.target.value)}
            placeholder=" "
            className={styles.input}
          />
          <label className={styles.label}>Country</label>
        </div>
      </div>
    </div>
  );
};

const LocationCard = ({
  address,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave
}) => {
  const displayLocation = address?.city && address?.state ? 
    `${address.city}, ${address.state}` : 
    'Add location details';
  
  return (
    <>
      <EditCard
        title="Location"
        content={displayLocation}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={(tempData) => onSave('address', tempData)}
        title="Location"
        initialData={address}
      >
        <LocationForm />
      </EditModal>
    </>
  );
};

export default LocationCard; 