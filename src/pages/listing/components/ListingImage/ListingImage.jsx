import React, { useState } from 'react';
import { FiShare } from 'react-icons/fi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './ListingImage.module.css';

const ListingImage = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesArray = images || [images];

  const handleNavigation = (direction) => {
    setCurrentIndex(prev => {
      const newIndex = prev + direction;
      return Math.max(0, Math.min(newIndex, imagesArray.length - 1));
    });
  };

  return (
    <div className={styles.imageContainer}>
      <div 
        className={styles.imageSlider}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {imagesArray.map((image, index) => (
          <div key={index} className={styles.imageSlide}>
            <img src={image} alt={`${title} - Image ${index + 1}`} />
          </div>
        ))}
      </div>
      
      {currentIndex > 0 && (
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={() => handleNavigation(-1)}
          aria-label="Previous image"
        >
          <FaChevronLeft />
        </button>
      )}
      {currentIndex < imagesArray.length - 1 && (
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={() => handleNavigation(1)}
          aria-label="Next image"
        >
          <FaChevronRight />
        </button>
      )}

      {imagesArray.length > 1 && (
        <div className={styles.imageCounter}>
          {currentIndex + 1} / {imagesArray.length}
        </div>
      )}

      <div className={styles.imageOverlay}>
        <button className={styles.shareButton}>
          <FiShare />
        </button>
      </div>
    </div>
  );
};

export default ListingImage; 