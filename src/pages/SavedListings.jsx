import React from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { FiEye } from 'react-icons/fi';
import ShareButton from '../components/common/Button/ShareButton';
import ListingMainInfo from '../pages/listing/components/ListingMainInfo/ListingMainInfo';
import ListingFeatures from '../pages/listing/components/ListingFeatures/ListingFeatures';
import { formatSquareFootage, formatLocationDetails } from '../utils/listingUtils';
import { fetchListing } from '../api';
import { normalizeListing } from '../models/Listing';
import ExitButton from '../components/common/Button/ExitButton';
import styles from './SavedListings.module.css';

const SavedListings = () => {
  const { user } = useAuth();
  const { bookmarks = [], isLoading: bookmarksLoading, error, isBookmarked, toggleBookmark, toggling } = useBookmarks();
  const navigate = useNavigate();

  // Fetch complete listing data for each bookmark
  const listingQueries = useQueries({
    queries: bookmarks.map(bookmark => ({
      queryKey: ['listing', bookmark.listing_id || bookmark.id],
      queryFn: () => fetchListing(bookmark.listing_id || bookmark.id).then(normalizeListing),
      enabled: !!(bookmark.listing_id || bookmark.id),
      staleTime: 5 * 60 * 1000,
    }))
  });

  const isLoading = bookmarksLoading || listingQueries.some(q => q.isLoading);

  const handleView = (e, listing) => {
    e.stopPropagation();
    // Don't pass incomplete bookmark data - let ListingPage fetch complete data
    navigate(`/property/${listing.id}`);
  };

  const handleCardClick = (listing) => {
    // Don't pass incomplete bookmark data - let ListingPage fetch complete data
    navigate(`/property/${listing.id}`);
  };

  const handleBookmarkClick = async (e, listing) => {
    e.stopPropagation(); // Prevent card click
    
    if (!user) {
      navigate('/login');
      return;
    }

    toggleBookmark(listing.id);
  };

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.message}>
          <h2>Please log in to view your saved listings</h2>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.message}>
          <h2>Loading your saved listings...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.message}>
          <h2>Error loading bookmarks</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  // Sort bookmarks by bookmarked_at date (most recent first)
  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    const dateA = new Date(a.bookmarked_at || a.created_at || 0);
    const dateB = new Date(b.bookmarked_at || b.created_at || 0);
    return dateB - dateA;
  });

  return (
    <div className={styles.container}>
      <ExitButton />

      <div className={styles.header}>
        <h1 className="page-title">Saved Listings</h1>
        <p className="page-subtitle">
          {bookmarks.length} {bookmarks.length === 1 ? 'property' : 'properties'} saved
        </p>
      </div>

      {sortedBookmarks.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🤍</div>
          <h2>No saved listings yet</h2>
          <p>Start browsing properties and save your favorites by clicking the heart icon.</p>
        </div>
      ) : (
        <div className={styles.content}>
          {sortedBookmarks.map((bookmark, index) => {
            // Use complete listing data fetched by ID
            const listingQuery = listingQueries[index];
            if (!listingQuery?.data) return null; // Skip if data not loaded yet
            
            const listing = listingQuery.data;
            const squareFootage = formatSquareFootage(listing.totalArea, listing.areaUnit);
            const locationDetails = formatLocationDetails(listing);

            return (
              <div 
                key={bookmark.listing_id || bookmark.id || listing.id} 
                className={styles.listingCard}
                onClick={() => handleCardClick(listing)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={listing.images?.[0] || listing.image || listing.photos?.[0]}
                    alt={listing.title}
                    className={styles.propertyImage}
                    loading="lazy"
                  />
                  <div className={styles.imageOverlay}>
                    <ShareButton
                      url={`${window.location.origin}/property/${listing.id}`}
                      className={`${styles.actionButton} ${styles.shareButton}`}
                    />
                    {/* Bookmark button - reuse same logic as ListingCard */}
                    <button
                      className={`${styles.actionButton} ${styles.bookmarkButton}`}
                      onClick={(e) => handleBookmarkClick(e, listing)}
                      disabled={toggling}
                      aria-label={isBookmarked(listing.id) ? 'Remove bookmark' : 'Add bookmark'}
                    >
                      {toggling ? (
                        <span>⏳</span>
                      ) : (
                        <span className={isBookmarked(listing.id) ? styles.bookmarkFilled : styles.bookmarkEmpty}>
                          {isBookmarked(listing.id) ? '❤️' : '🤍'}
                        </span>
                      )}
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
        </div>
      )}
    </div>
  );
};

export default SavedListings; 