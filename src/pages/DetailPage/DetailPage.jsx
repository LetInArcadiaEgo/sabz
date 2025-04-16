import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingsData } from '../../listings';
import { FaBed, FaBath, FaRulerCombined, FaArrowLeft, FaHome, FaClock, FaCar, FaStar, FaHammer, FaCertificate } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import styles from './DetailPage.module.css';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const listing = listingsData.find(item => item.id === parseInt(id));

  const { truncatedText, hasMoreText } = useMemo(() => {
    if (!listing?.description) return { truncatedText: '', hasMoreText: false };
    
    const words = listing.description.split(' ');
    const halfLength = Math.floor(words.length / 2);
    const truncated = words.slice(0, halfLength).join(' ');
    
    return {
      truncatedText: truncated + '...',
      hasMoreText: words.length > halfLength
    };
  }, [listing?.description]);

  const infoCards = [
    { icon: FaHome, field: 'propertyType' },
    { icon: FaClock, field: 'listingAdded' },
    { icon: FaCar, field: 'parking' },
    { icon: FaStar, field: 'highlight' },
    { icon: FaHammer, field: 'age' },
    { icon: FaCertificate, field: 'status' }
  ];

  if (!listing) {
    return (
      <div className={styles.detailPage}>
        <h1>Property Not Found</h1>
        <button onClick={() => navigate('/listings')} className={styles.backButton}>
          <FaArrowLeft />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      <div className={styles.header}>
        <button onClick={() => navigate('/listings')} className={styles.backButton}>
          <FaArrowLeft />
        </button>
        <div className={styles.logoContainer}>
          <img src="/images/Sabz_Logo_WhiteBG_transparent.png" alt="Sabz Logo" className={styles.logo} />
          <span className={styles.tagline}>Ghar dhoondna,{'\n'}abh simple!</span>
        </div>
      </div>
      
      <div className={styles.propertyDetails}>
        <div className={styles.imageContainer}>
          <img 
            src={listing.images[currentImageIndex]} 
            alt={listing.title} 
            draggable="false"
            onTouchStart={(e) => e.currentTarget.dataset.touchX = e.touches[0].clientX}
            onTouchEnd={(e) => {
              const diff = e.currentTarget.dataset.touchX - e.changedTouches[0].clientX;
              if (diff > 50) setCurrentImageIndex(prev => (prev < listing.images.length - 1 ? prev + 1 : 0));
              if (diff < -50) setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : listing.images.length - 1));
            }}
          />
          <div className={styles.imageOverlay}>
            <button className={styles.shareButton}>
              <FiShare />
            </button>
            {listing.images.length > 1 && (
              <div className={styles.dotIndicators}>
                {listing.images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.statusContainer}>
            <div className={styles.activeStatus}>
              <div className={styles.activeDot}></div>
              Active
            </div>
          </div>

          <div className={styles.price}>PKR {listing.price.toLocaleString()}</div>
          <h1>{listing.title}</h1>
          <div className={styles.location}>
            <p>{listing.locationDetails}</p>
          </div>
          
          <div className={styles.mainFeatures}>
            <div className={styles.feature}>
              <FaRulerCombined />
              <span>{listing.squareFootage}</span>
            </div>
            <div className={styles.feature}>
              <FaBed />
              <span>{listing.bedrooms} Bedrooms</span>
            </div>
            <div className={styles.feature}>
              <FaBath />
              <span>{listing.bathrooms} Bathrooms</span>
            </div>
          </div>

          <div className={styles.infoCardsGrid}>
            {infoCards.map(({ icon: Icon, field }) => (
              <div key={field} className={styles.infoCard}>
                <Icon />
                {listing[field]}
              </div>
            ))}
          </div>

          <div className={styles.aboutSection}>
            <h2>About this place</h2>
            <p>
              {isExpanded ? listing.description : truncatedText}
            </p>
            {hasMoreText && (
              <button 
                className={styles.showMoreButton}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span>{isExpanded ? 'Show less' : 'Show more'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage; 