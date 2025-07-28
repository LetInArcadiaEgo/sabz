import React from 'react';
import styles from './MyListings.module.css';
import ListingMainInfo from '../../pages/listing/components/ListingMainInfo/ListingMainInfo';
import ListingFeatures from '../../pages/listing/components/ListingFeatures/ListingFeatures';
import { FiEdit2, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ShareButton from '../../components/common/Button/ShareButton';
import { useApprovedListings } from '../../hooks/useApprovedListings';
import { formatSquareFootage, formatLocationDetails } from '../../utils/listingUtils';

const MyListings = () => {
  const navigate = useNavigate();

  // Fetch all approved listings (Phase 1)
  const { listings, loading, error } = useApprovedListings();

  const handleEdit = (e, listing) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/my-listings/edit/${listing.id}`);
  };

  const handleView = (e, listing) => {
    e.stopPropagation();
    navigate(`/property/${listing.id}`, { state: { listing } });
  };

  const handleCardClick = (listing) => {
    navigate(`/my-listings/edit/${listing.id}`);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading listings…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Listings</h1>
        <p className={styles.subtitle}>Manage your property listings</p>
      </div>

      <div className={styles.content}>
        {listings.map((listing) => {
          const squareFootage   = formatSquareFootage(
            listing.totalArea ?? listing.total_area,
            listing.areaUnit  ?? listing.area_unit
          );
          const locationDetails = formatLocationDetails(listing);

          return (
            <div 
              key={listing.id} 
              className={styles.listingCard}
              onClick={() => handleCardClick(listing)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.imageContainer}>
                <img
                  src={listing.images?.[0] || listing.image}
                  alt={listing.title}
                  className={styles.propertyImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}>
                  <ShareButton
                    url={`${window.location.origin}/property/${listing.id}`}
                    className={`${styles.actionButton} ${styles.shareButton}`}
                  />
                  <button 
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={(e) => handleEdit(e, listing)}
                    aria-label="Edit listing"
                  >
                    <FiEdit2 />
                  </button>
                </div>
                <div className={styles.imageOverlayBottom}>
                  <button
                    className={styles.viewButton}
                    onClick={(e) => handleView(e, listing)}
                    aria-label="View listing"
                  >
                    <FiEye /> View
                  </button>
                </div>
              </div>

              <div className={styles.cardContent}>
                <ListingMainInfo
                  price={listing.price}
                  title={listing.title}
                  locationDetails={locationDetails}
                />
                <ListingFeatures
                  squareFootage={squareFootage}
                  bedrooms={listing.bedrooms}
                  bathrooms={listing.bathrooms}
                />
                <p className={styles.propertyDescription}>
                  {listing.description}
                </p>
              </div>
            </div>
          );
        })}

        {listings.length === 0 && !loading && !error && (
          <div className={styles.emptyState}>
            <p>You haven't posted any listings yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings; 