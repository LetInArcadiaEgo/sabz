import React, { memo } from 'react';
import { ListingPropTypes } from '../../models/Listing';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import styles from './ListingCard.module.css';
import { formatPrice, formatLocationDetails, formatSquareFootage } from '../../utils/listingUtils';
import { useAuth } from '../../context/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import ListingFeatures from '../../pages/listing/components/ListingFeatures/ListingFeatures';


const ListingCard = memo(({ listing }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isBookmarked, toggleBookmark, toggling } = useBookmarks();

  const handleClick = () => {
    navigate(`/property/${listing.id}`, { state: { listing } });
    window.scrollTo(0, 0);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  const handleBookmarkClick = async (e) => {
    e.stopPropagation(); // Prevent card click
    
    if (!user) {
      navigate('/login');
      return;
    }

    toggleBookmark(listing.id);
  };

  const {
    images,
    title,
    bedrooms,
    bathrooms,
    price,
  } = listing;

  // Map backend fields to UI-friendly values (following ListingPage pattern)
  const totalArea = listing.totalArea ?? listing.total_area;
  const areaUnit  = listing.areaUnit  ?? listing.area_unit;
  const squareFootage   = formatSquareFootage(totalArea, areaUnit);
  const locationDetails = formatLocationDetails(listing);
  const hasMultipleImages = images?.length > 1;
  const imageToShow = hasMultipleImages ? images : [images?.[0] || listing.image];

  return (
    <div 
      className={styles.card} 
      onClick={handleClick} 
      onKeyPress={handleKeyPress}
      role="button" 
      tabIndex={0}
    >
      <div className={styles.imageContainer}>
        {hasMultipleImages ? (
          <ImageCarousel images={images} />
        ) : (
          <img 
            className={styles.image}
            src={imageToShow[0]} 
            alt={title}
            loading="lazy"
          />
        )}
        
        {/* Bookmark button */}
        <button
          className={styles.bookmarkButton}
          onClick={handleBookmarkClick}
          disabled={toggling}
          aria-label={isBookmarked(listing.id) ? 'Remove bookmark' : 'Add bookmark'}
        >
          {toggling ? (
            <span className={styles.bookmarkLoading}>⏳</span>
          ) : (
            <span className={isBookmarked(listing.id) ? styles.bookmarkFilled : styles.bookmarkEmpty}>
              {isBookmarked(listing.id) ? '❤️' : '🤍'}
            </span>
          )}
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.price}>{formatPrice(price)}</div>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.locationDetails}>{locationDetails}</div>
        <ListingFeatures
          squareFootage={squareFootage}
          bedrooms={bedrooms}
          bathrooms={bathrooms}
        />
      </div>
    </div>
  );
});

ListingCard.propTypes = {
  listing: ListingPropTypes.isRequired,
};

ListingCard.displayName = 'ListingCard';

export default ListingCard;
