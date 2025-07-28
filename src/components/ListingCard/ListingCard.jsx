import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import styles from './ListingCard.module.css';
import { formatPrice, formatLocationDetails, formatSquareFootage } from '../../utils/listingUtils';

const ListingCard = memo(({ listing }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${listing.id}`, { state: { listing } });
    window.scrollTo(0, 0);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  const {
    images,
    title,
    totalArea,
    areaUnit,
    bedrooms,
    bathrooms,
    price,
  } = listing;

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
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.locationDetails}>{locationDetails}</div>
        <div className={styles.details}>
          {squareFootage} {squareFootage && ' // '} {bedrooms} Bedrooms // {bathrooms} Bathrooms
        </div>
        <div className={styles.price}>{formatPrice(price)}</div>
      </div>
    </div>
  );
});

ListingCard.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    totalArea:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    areaUnit:   PropTypes.string,
    locationDetails: PropTypes.string,
    address:    PropTypes.shape({
      city:  PropTypes.string,
      state: PropTypes.string,
    }),
    bedrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bathrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

ListingCard.displayName = 'ListingCard';

export default ListingCard;
