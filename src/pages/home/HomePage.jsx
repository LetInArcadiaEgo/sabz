import React from 'react';
import ListingCard from '../../components/ListingCard/ListingCard';
import Search from '../../components/Search/Search';
import styles from './HomePage.module.css';
import { useApprovedListings } from '../../hooks/useApprovedListings';

function HomePage() {
    const { listings, loading, error } = useApprovedListings();

    if (loading) return <div className={styles.pageContainer}>Loading...</div>;
    if (error) return <div className={styles.pageContainer}>Error: {error}</div>;

    return (
        <div className={styles.pageContainer}>
            <Search />
            <div className={styles.listingsContainer}>
                {listings.map((listing) =>(
                    <ListingCard
                        key={listing.id}
                        listing={listing}
                    />
                ))}
            </div>
        </div>
    );
}

export default HomePage; 