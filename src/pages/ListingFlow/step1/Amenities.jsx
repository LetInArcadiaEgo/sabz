import React, { useState } from 'react';
import styles from './Amenities.module.css';
import commonStyles from './ListingFlowCommon.module.css';
import { useNavigate } from 'react-router-dom';
import ExitButton from '../../../components/common/Button/ExitButton';
import NavigationButtons from '../../../components/common/Button/NavigationButtons';
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

const Amenities = () => {
  const navigate = useNavigate();
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenities = [
    // Utilities
    { id: 'power', label: 'Electricity Backup', icon: <FaBolt size={32} /> },
    { id: 'internet', label: 'Fast Wifi', icon: <FaWifi size={32} /> },
    { id: 'gas', label: 'Sui Gas', icon: <FaFire size={32} /> },
    { id: 'ac', label: 'Air Conditioning', icon: <FaSnowflake size={32} /> },
    // Recreation & Community
    { id: 'hospital', label: 'Nearby Hospital', icon: <FaHospital size={32} /> },
    { id: 'mosque', label: 'Nearby Mosque', icon: <FaMosque size={32} /> },
    { id: 'schools', label: 'Nearby Schools', icon: <FaSchool size={32} /> },
    { id: 'dispensary', label: 'Nearby Medical Dispensary', icon: <FaClinicMedical size={32} /> },
    { id: 'garden', label: 'Lawn or Garden', icon: <FaTree size={32} /> },
    // Security & Safety
    { id: 'gated', label: 'Gated Community', icon: <FaShieldAlt size={32} /> },
    { id: 'cctv', label: 'CCTV Security', icon: <FaVideo size={32} /> },
    { id: 'maintenance', label: 'Maintenance Staff', icon: <FaTools size={32} /> },
    { id: 'security', label: 'Security Staff', icon: <FaUserShield size={32} /> },
    // Rooms & Spaces
    { id: 'servant', label: 'Servant Room', icon: <FaHome size={32} /> },
    { id: 'store', label: 'Store Room', icon: <FaBox size={32} /> },
    { id: 'parking', label: 'Covered Parking', icon: <FaCarSide size={32} /> }
  ];

  const handleNext = () => {
    navigate('/listing-flow/step-2/intro');
  };

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenityId)) {
        return prev.filter(id => id !== amenityId);
      }
      return [...prev, amenityId];
    });
  };

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.content}>
        <h1 className={commonStyles.stepTitle}>What amenities does your property have?</h1>
        <p className={commonStyles.stepSubtitle}>Select all the amenities available at your property.</p>

        <div className={styles.section}>
          <div className={styles.amenitiesGrid}>
            {amenities.map((amenity) => (
              <button
                key={amenity.id}
                className={`${styles.amenityCard} ${selectedAmenities.includes(amenity.id) ? styles.selected : ''}`}
                onClick={() => toggleAmenity(amenity.id)}
              >
                <span className={styles.amenityIcon}>{amenity.icon}</span>
                <span className={styles.amenityLabel}>{amenity.label}</span>
              </button>
            ))}
          </div>
        </div>

        <NavigationButtons 
          onNext={handleNext}
          disableNext={false}
        />
      </div>
    </div>
  );
};

export default Amenities; 