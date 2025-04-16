import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ListingCard.module.css';

function ListingCard({ listing }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/property/${listing.id}`);
    };

    return (
        <div className={styles.card} onClick={handleClick} role="button" tabIndex={0}>
            <div className={styles.imageContainer}>
                <img 
                    className={styles.image}
                    src={listing.images[0]} 
                    alt={listing.title} 
                />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>{listing.title}</h2>
                <div className={styles.locationDetails}>{listing.locationDetails}</div>
                <div className={styles.details}>
                    {listing.squareFootage} // {listing.bedrooms} Bedrooms // {listing.bathrooms} Bathrooms
                </div>
                <div className={styles.price}>PKR {(listing.price / 10000000).toFixed(1)} Crore</div>
            </div>
        </div>
    )
}

export default ListingCard;