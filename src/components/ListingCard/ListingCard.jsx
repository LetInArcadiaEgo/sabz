import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ListingCard.module.css';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'; // FontAwesome icons

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
                    src={listing.image} 
                    alt={listing.title} 
                />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>{listing.title}</h2>
                <div className={styles.price}>PKR {listing.price.toLocaleString()}</div>
                <div className={styles.details}>
                    <div><FaBed /> {listing.bedrooms}</div>
                    <div><FaBath /> {listing.bathrooms}</div>
                    <div><FaRulerCombined /> {listing.squareFootage}</div>
                </div>
                {/* <div className={styles.location}>
                    <span>Property Type: {listing.propertyType}</span>
                </div> */}
            </div>
        </div>
    )
}

export default ListingCard;