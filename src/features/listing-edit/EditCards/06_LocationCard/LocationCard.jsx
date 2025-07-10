import React from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './LocationCard.module.css';

const LocationCard = ({
  address,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave,
  tempAddress,
  onAddressChange,
}) => {
  const currentAddress = tempAddress || address;
  const displayLocation = currentAddress?.city && currentAddress?.state ? 
    `${currentAddress.city}, ${currentAddress.state}` : 
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
        onSave={() => {
          onSave('address', tempAddress || address);
        }}
        title="Location"
        initialData={{ address }}
      >
        <div className={styles.content}>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={currentAddress.street || ''}
                onChange={(e) => onAddressChange({
                  ...currentAddress,
                  street: e.target.value
                })}
                placeholder=" "
                className={styles.input}
              />
              <label className={styles.label}>Street address</label>
            </div>

            <div className={styles.inputContainer}>
              <input
                type="text"
                value={currentAddress.unit || ''}
                onChange={(e) => onAddressChange({
                  ...currentAddress,
                  unit: e.target.value
                })}
                placeholder=" "
                className={styles.input}
              />
              <label className={styles.label}>Apt, floor, bldg (if applicable)</label>
            </div>

            <div className={styles.inputContainer}>
              <select
                value={currentAddress.city || ''}
                onChange={(e) => onAddressChange({
                  ...currentAddress,
                  city: e.target.value
                })}
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
                value={currentAddress.state || ''}
                onChange={(e) => onAddressChange({
                  ...currentAddress,
                  state: e.target.value
                })}
                placeholder=" "
                className={styles.input}
              />
              <label className={styles.label}>Area (DHA, Gulberg, Lake City, etc.)</label>
            </div>

            <div className={styles.inputContainer}>
              <input
                type="text"
                value={currentAddress.zipCode || ''}
                onChange={(e) => onAddressChange({
                  ...currentAddress,
                  zipCode: e.target.value
                })}
                placeholder=" "
                className={styles.input}
              />
              <label className={styles.label}>Postal code (if applicable)</label>
            </div>

            <div className={styles.inputContainer}>
              <input
                type="text"
                value={currentAddress.country || 'Pakistan'}
                onChange={(e) => onAddressChange({
                  ...currentAddress,
                  country: e.target.value
                })}
                placeholder=" "
                className={styles.input}
              />
              <label className={styles.label}>Country</label>
            </div>
          </div>
        </div>
      </EditModal>
    </>
  );
};

export default LocationCard; 