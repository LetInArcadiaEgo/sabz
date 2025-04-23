import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import styles from './ListingCard.module.css';

const formatPrice = (price) => {
  return `PKR ${(price / 10000000).toFixed(1)} Crore`;
};

const ListingCard = memo(({ listing }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${listing.id}`);
    window.scrollTo(0, 0);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  const { images, title, locationDetails, squareFootage, bedrooms, bathrooms, price } = listing;
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
          {squareFootage} // {bedrooms} Bedrooms // {bathrooms} Bathrooms
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
    locationDetails: PropTypes.string.isRequired,
    squareFootage: PropTypes.string.isRequired,
    bedrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bathrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

ListingCard.displayName = 'ListingCard';

export default ListingCard;