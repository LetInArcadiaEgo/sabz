import React from 'react';
import styles from './MyListings.module.css';
import ListingMainInfo from '../../pages/listing/components/ListingMainInfo/ListingMainInfo';
import ListingFeatures from '../../pages/listing/components/ListingFeatures/ListingFeatures';
import { FiShare, FiEdit2, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MyListings = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from your backend
  const userListings = [
    {
      id: 1,
      image: '/images/house1.jpg',
      price: 2500000,
      title: 'Modern Family Home',
      locationDetails: 'Lahore, Punjab',
      squareFootage: '2500 sqft',
      bedrooms: 4,
      bathrooms: 3,
      description: 'A beautiful modern house with spacious rooms and stunning views. Perfect for families looking for comfort and luxury.'
    },
    {
      id: 2,
      image: '/images/house3.jpg',
      price: 3200000,
      title: 'Luxury Villa with Pool',
      locationDetails: 'DHA Phase 6, Lahore',
      squareFootage: '3200 sqft',
      bedrooms: 5,
      bathrooms: 4,
      description: 'Stunning luxury villa featuring a private swimming pool, landscaped garden, and modern amenities. Perfect for upscale living in a prime location.'
    }
  ];

  const handleShare = (e, listing) => {
    e.stopPropagation(); // Prevent card click
    // Implement share functionality here
    console.log('Share listing:', listing);
  };

  const handleEdit = (e, listing) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/my-listings/edit/${listing.id}`);
  };

  const handleView = (e, listing) => {
    e.stopPropagation(); // Prevent card click
    // Implement view functionality here
    console.log('View listing:', listing);
  };

  const handleCardClick = (listing) => {
    navigate(`/my-listings/edit/${listing.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Listings</h1>
        <p className={styles.subtitle}>Manage your property listings</p>
      </div>

      <div className={styles.content}>
        {userListings.map((listing) => (
          <div 
            key={listing.id} 
            className={styles.listingCard}
            onClick={() => handleCardClick(listing)}
            role="button"
            tabIndex={0}
          >
            <div className={styles.imageContainer}>
              <img
                src={listing.image}
                alt={listing.title}
                className={styles.propertyImage}
              />
              <div className={styles.imageOverlay}>
                <button 
                  className={`${styles.actionButton} ${styles.shareButton}`}
                  onClick={(e) => handleShare(e, listing)}
                  aria-label="Share listing"
                >
                  <FiShare />
                </button>
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
                locationDetails={listing.locationDetails}
              />
              <ListingFeatures
                squareFootage={listing.squareFootage}
                bedrooms={listing.bedrooms}
                bathrooms={listing.bathrooms}
              />
              <p className={styles.propertyDescription}>
                {listing.description}
              </p>
            </div>
          </div>
        ))}

        {userListings.length === 0 && (
          <div className={styles.emptyState}>
            <p>You haven't posted any listings yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings; 