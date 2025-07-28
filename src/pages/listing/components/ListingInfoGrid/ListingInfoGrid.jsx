import React, { useState } from 'react';
import { FaClock, FaCertificate, FaBuilding } from 'react-icons/fa';
import styles from './ListingInfoGrid.module.css';
import { propertyTypeMap } from '../../../../components/common/data/propertyTypes';
import { amenitiesMap } from '../../../../components/common/data/amenities';
import FeatureListModal from './FeatureListModal';
import { PROPERTY_TYPES } from '../../../../components/common/data/propertyTypes';

// Helper – convert timestamp → relative human-friendly string
const formatRelativeTime = (isoDate) => {
  if (!isoDate) return '-';

  const diffMs   = Date.now() - new Date(isoDate).getTime();
  const diffSec  = Math.floor(diffMs / 1000);
  const diffMin  = Math.floor(diffSec / 60);
  const diffHrs  = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);
  const diffWks  = Math.floor(diffDays / 7);
  const diffMon  = Math.floor(diffDays / 30);
  const diffYrs  = Math.floor(diffDays / 365);

  if (diffSec < 60) return 'Just now';

  if (diffMin < 61) return 'one hour ago'; // 1-60 minutes → "one hour ago"

  if (diffHrs < 24) return `${diffHrs} hours ago`;

  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;

  if (diffWks < 4) return `${diffWks} week${diffWks === 1 ? '' : 's'} ago`;

  if (diffMon < 12) return `${diffMon} month${diffMon === 1 ? '' : 's'} ago`;

  return `${diffYrs} year${diffYrs === 1 ? '' : 's'} ago`;
};

const ListingInfoGrid = ({ listing = {} }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const selectedAmenities = Array.isArray(listing.amenities) ? listing.amenities : [];
  const firstAmenityId   = selectedAmenities[0];
  const firstAmenity     = amenitiesMap[firstAmenityId];

  // Support both camelCase (propertyType) and legacy snake_case (property_type)
  const rawPropertyType = listing.propertyType ?? listing.property_type;
  
  let propertyEntry = {};
  if (typeof rawPropertyType === 'string') {
    const key = rawPropertyType.trim().toLowerCase();
    propertyEntry = propertyTypeMap[key] || {};
  } else if (rawPropertyType && typeof rawPropertyType === 'object') {
    const raw = rawPropertyType.place || rawPropertyType.id || rawPropertyType.value;
    const place = (raw || '').toString().trim().toLowerCase();
    propertyEntry =
      PROPERTY_TYPES.find(pt => pt.id === place || pt.label.toLowerCase() === place) || {};
  }
  // Final fallback if still empty
  if (!propertyEntry.icon && rawPropertyType) {
    // Human-friendly label: capitalize first letter
    const labelStr = typeof rawPropertyType === 'string'
      ? rawPropertyType.trim()
      : (rawPropertyType.place || rawPropertyType.id || '').toString().trim();
    const friendly = labelStr.charAt(0).toUpperCase() + labelStr.slice(1);
    propertyEntry = { icon: FaBuilding, label: friendly };
  }

  const infoCards = [
    {
      icon: propertyEntry.icon || FaBuilding,
      value: propertyEntry.label || '-',
    },
    {
      icon: FaClock,
      value: formatRelativeTime(listing.created_at || listing.createdAt),
    },
    {
      icon: firstAmenity?.icon,
      value: firstAmenity?.label || '-',
    },
    {
      icon: FaCertificate,
      value: (listing.status || 'Approved').charAt(0).toUpperCase() + (listing.status || 'Approved').slice(1),
    },
  ];

  return (
    <>
      <div className={styles.featuresSection}>
        <div className={styles.infoCardsGrid}>
          {infoCards.map(({ icon: Icon, value }, idx) => (
            <div key={idx} className={styles.infoCard}>
              {Icon && <Icon />}
              {value}
            </div>
          ))}
        </div>

        {selectedAmenities.length > 0 && (
          <button
            className={styles.showAllFeaturesBtn}
            onClick={() => setModalOpen(true)}
          >
            Show all {selectedAmenities.length} features
          </button>
        )}
      </div>

      <FeatureListModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedAmenities={selectedAmenities}
        generalInfo={[
          { id: 'propertyType', icon: propertyEntry.icon || FaBuilding, label: propertyEntry.label || (listing.propertyType?.place || listing.propertyType || '-') },
          { id: 'posted', icon: FaClock, label: formatRelativeTime(listing.created_at || listing.createdAt) },
          { id: 'status', icon: FaCertificate, label: (listing.status || 'Approved').charAt(0).toUpperCase() + (listing.status || 'Approved').slice(1) },
        ]}
      />
    </>
  );
};

export default ListingInfoGrid; 