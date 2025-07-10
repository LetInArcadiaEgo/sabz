import React from 'react';
import EditCard from '../EditCard';
import EditModal from '../../../../components/common/EditModal/EditModal';
import styles from './AmenitiesCard.module.css';
import { 
  FaBolt,
  FaWifi,
  FaFire,
  FaSnowflake,
  FaTree,
  FaMosque,
  FaSchool,
  FaClinicMedical,
  FaHospital,
  FaShieldAlt,
  FaVideo,
  FaTools,
  FaUserShield,
  FaHome,
  FaBox,
  FaCarSide
} from 'react-icons/fa';

const AMENITY_OPTIONS = [
  // Utilities
  { value: 'power', label: 'Power Backup', icon: <FaBolt /> },
  { value: 'internet', label: 'Internet', icon: <FaWifi /> },
  { value: 'gas', label: 'Sui Gas', icon: <FaFire /> },
  { value: 'ac', label: 'Air Conditioning', icon: <FaSnowflake /> },
  // Recreation & Community
  { value: 'hospital', label: 'Nearby Hospital', icon: <FaHospital /> },
  { value: 'mosque', label: 'Nearby Mosque', icon: <FaMosque /> },
  { value: 'schools', label: 'Nearby Schools', icon: <FaSchool /> },
  { value: 'dispensary', label: 'Nearby Medical Dispensary', icon: <FaClinicMedical /> },
  { value: 'garden', label: 'Lawn or Garden', icon: <FaTree /> },
  // Security & Safety
  { value: 'gated', label: 'Gated Community', icon: <FaShieldAlt /> },
  { value: 'cctv', label: 'CCTV Security', icon: <FaVideo /> },
  { value: 'maintenance', label: 'Maintenance Staff', icon: <FaTools /> },
  { value: 'security', label: 'Security Staff', icon: <FaUserShield /> },
  // Rooms & Spaces
  { value: 'servant', label: 'Servant Room', icon: <FaHome /> },
  { value: 'store', label: 'Store Room', icon: <FaBox /> },
  { value: 'parking', label: 'Covered Parking', icon: <FaCarSide /> }
];

const AmenitiesCard = ({
  amenities,
  isModalOpen,
  onModalOpen,
  onModalClose,
  onSave,
  tempAmenities,
  onAmenitiesChange
}) => {
  const handleAmenityToggle = (amenityValue) => {
    const currentAmenities = tempAmenities || amenities;
    const newAmenities = currentAmenities.includes(amenityValue)
      ? currentAmenities.filter(a => a !== amenityValue)
      : [...currentAmenities, amenityValue];
    onAmenitiesChange(newAmenities);
  };

  const currentAmenities = tempAmenities || amenities;

  return (
    <>
      <EditCard
        title="Amenities"
        content={`${currentAmenities.length} selected`}
        onClick={onModalOpen}
      />

      <EditModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onSave={() => onSave('amenities', tempAmenities || amenities)}
        title="Amenities"
        initialData={amenities}
      >
        <div className={styles.content}>
          <div className={styles.section}>
            <div className={styles.cardGrid}>
              {AMENITY_OPTIONS.map(({ value, label, icon }) => (
                <button
                  key={value}
                  className={`${styles.card} ${currentAmenities.includes(value) ? styles.selected : ''}`}
                  onClick={() => handleAmenityToggle(value)}
                >
                  <span className={styles.cardIcon}>{icon}</span>
                  <span className={styles.cardLabel}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </EditModal>
    </>
  );
};

export default AmenitiesCard; 