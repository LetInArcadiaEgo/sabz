import React, { useState, useEffect } from 'react';
import styles from './MyListings.module.css';
import ListingMainInfo from '../../pages/listing/components/ListingMainInfo/ListingMainInfo';
import ListingFeatures from '../../pages/listing/components/ListingFeatures/ListingFeatures';
import { FiEdit2, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ShareButton from '../../components/common/Button/ShareButton';
import { useAuth } from '../../context/AuthContext';
import { formatSquareFootage, formatLocationDetails } from '../../utils/listingUtils';
import ExitButton from '../../components/common/Button/ExitButton';

const API_BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

const MyListings = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, getToken, signOut } = useAuth();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user's listings from dedicated endpoint
  useEffect(() => {
    const fetchMyListings = async () => {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const token = getToken();
        const response = await fetch(`${API_BASE_URL}/api/me/listings`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          setMyListings(data.data || []);
        } else {
          setError(data.error || 'Failed to fetch listings');
        }
      } catch (err) {
        setError('Failed to fetch listings');
        console.error('Error fetching user listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, [user, getToken]);

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

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // Show login message if user is not authenticated
  if (!authLoading && !user) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="page-title">My Listings</h1>
          <p className="page-subtitle">Please log in to view your listings</p>
        </div>
      </div>
    );
  }

  if (authLoading || loading) {
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
      <ExitButton />
      <button className={styles.logoutButton} onClick={handleLogout}>
        Log out
      </button>

      <div className={styles.header}>
        <h1 className="page-title">My Listings</h1>
        <p className="page-subtitle">Manage your property listings</p>
      </div>

      <div className={styles.content}>
        {myListings.map((listing) => {
          const squareFootage = formatSquareFootage(
            listing.total_area,
            listing.area_unit
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

        {myListings.length === 0 && !loading && !error && user && (
          <div className={styles.emptyState}>
            <p>You haven't posted any listings yet.</p>
            <button 
              onClick={() => navigate('/create-listing')}
              className={styles.createButton}
            >
              Create Your First Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings; 