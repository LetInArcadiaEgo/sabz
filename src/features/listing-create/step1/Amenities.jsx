import React, { useState, useEffect } from 'react';
import { useListingDraft } from '../../../context/ListingDraftProvider'; 
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
  const { setDraft } = useListingDraft();     // write amenities into shared draft
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenities = [
    // Utilities
    { id: 'power', label: 'Electricity Backup', icon: <FaBolt /> },
    { id: 'internet', label: 'Fast Wifi', icon: <FaWifi /> },
    { id: 'gas', label: 'Sui Gas', icon: <FaFire /> },
    { id: 'ac', label: 'Air Conditioning', icon: <FaSnowflake /> },
    // Recreation & Community
    { id: 'hospital', label: 'Nearby Hospital', icon: <FaHospital /> },
    { id: 'mosque', label: 'Nearby Mosque', icon: <FaMosque /> },
    { id: 'schools', label: 'Nearby Schools', icon: <FaSchool /> },
    { id: 'dispensary', label: 'Nearby Medical Dispensary', icon: <FaClinicMedical /> },
    { id: 'garden', label: 'Lawn or Garden', icon: <FaTree /> },
    // Security & Safety
    { id: 'gated', label: 'Gated Community', icon: <FaShieldAlt /> },
    { id: 'cctv', label: 'CCTV Security', icon: <FaVideo /> },
    { id: 'maintenance', label: 'Maintenance Staff', icon: <FaTools /> },
    { id: 'security', label: 'Security Staff', icon: <FaUserShield /> },
    // Rooms & Spaces
    { id: 'servant', label: 'Servant Room', icon: <FaHome /> },
    { id: 'store', label: 'Store Room', icon: <FaBox /> },
    { id: 'parking', label: 'Covered Parking', icon: <FaCarSide /> }
  ];

  const handleNext = () => {
    navigate('/listing-flow/step-2/intro');
  };

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities(prev => {
      const next = prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId];
      setDraft(d => ({ ...d, amenities: next }));   // 🆕 save to draft
      return next;
    });
  };

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.content}>
        <h1 className={commonStyles.stepTitle}>What amenities does your property have?</h1>
        <p className={commonStyles.stepSubtitle}>Select all the amenities available at your property.</p>

        <div className={styles.section}>
          <div className={commonStyles.cardGrid}>
            {amenities.map((amenity) => (
              <button
                key={amenity.id}
                className={`${commonStyles.card} ${selectedAmenities.includes(amenity.id) ? commonStyles.selected : ''}`}
                onClick={() => toggleAmenity(amenity.id)}
              >
                <span className={commonStyles.cardIcon}>{amenity.icon}</span>
                <span className={commonStyles.cardLabel}>{amenity.label}</span>
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