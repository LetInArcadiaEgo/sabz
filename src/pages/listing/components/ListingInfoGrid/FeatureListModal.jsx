import React, { useEffect, useState, useRef } from 'react';
import styles from './FeatureListModal.module.css';
import { amenitiesMap, groupAmenitiesByCategory } from '../../../../components/common/data/amenities';
import { FaArrowLeft } from 'react-icons/fa';

const FeatureListModal = ({ isOpen, onClose, selectedAmenities = [], generalInfo = [] }) => {
  const [mounted, setMounted] = useState(false);
  const sheetRef = useRef(null);
  const ANIM_MS = 300;

  const handleClose = () => {
    // start slide-down animation
    setMounted(false);
    // wait for animation to finish before unmounting parent state
    setTimeout(() => {
      onClose();
    }, ANIM_MS);
  };

  useEffect(() => {
    if (isOpen) {
      // defer to next frame so transition triggers
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const groups = groupAmenitiesByCategory(selectedAmenities);

  return (
    <>
      <div className={`${styles.backdrop} ${mounted ? styles.backdropVisible : ''}`} onClick={handleClose} />
      <div
        ref={sheetRef}
        className={`${styles.sheet} ${mounted ? styles.open : ''}`}
      >
        <button className={styles.backBtn} onClick={handleClose}>
          <FaArrowLeft />
        </button>
        <h2 className={styles.modalTitle}>List of Features</h2>

        <div className={styles.content}>
          {generalInfo.length > 0 && (
            <div className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>General Info</h3>
              <div className={styles.featuresList}>
                {generalInfo.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className={styles.featureItem}>
                      <Icon />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {Object.keys(groups).map((category) => (
            <div key={category} className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>{category}</h3>
              <div className={styles.featuresList}>
                {groups[category].map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={amenity.id} className={styles.featureItem}>
                      <Icon />
                      {amenity.label}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeatureListModal; 