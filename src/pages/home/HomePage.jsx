import React from 'react';
import { listingsData } from '../../listings';
import ListingCard from '../../components/ListingCard/ListingCard';
import Search from '../../components/Search/Search';
import styles from './HomePage.module.css';

function HomePage() {
    return (
        <div className={styles.pageContainer}>
            <Search />
            <div className={styles.listingsContainer}>
                {listingsData.map((listing) =>(
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