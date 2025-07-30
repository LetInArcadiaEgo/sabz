import React, { useState, useCallback } from 'react';
import ListingCard from '../../components/ListingCard/ListingCard';
import Search from '../../components/Search/Search';
import styles from './HomePage.module.css';
import { useApprovedListings } from '../../hooks/useApprovedListings';

function HomePage() {
    const { listings, loading, error } = useApprovedListings();
    const [searchResults, setSearchResults] = useState([]);
    const [searchActive, setSearchActive] = useState(false);

    // Handle search results from Search component
    const handleSearchResults = useCallback((filteredListings) => {
        setSearchResults(filteredListings);
    }, []);

    // Handle filter changes from Search component
    const handleFiltersChange = useCallback((filters, hasActiveFilters) => {
        setSearchActive(hasActiveFilters);
    }, []);

    if (loading) return <div className={styles.pageContainer}>Loading...</div>;
    if (error) return <div className={styles.pageContainer}>Error: {error}</div>;

    // Show search results if search is active, otherwise show all listings
    const listingsToShow = searchActive ? searchResults : listings;

    return (
        <div className={styles.pageContainer}>
            <Search 
                listings={listings}
                onSearchResults={handleSearchResults}
                onFiltersChange={handleFiltersChange}
            />
            
            {/* Search status indicator */}
            {searchActive && (
                <div className={styles.searchStatus}>
                    <span className={styles.resultCount}>
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </span>
                </div>
            )}

            {/* Listings grid */}
            <div className={styles.listingsContainer}>
                {listingsToShow.length > 0 ? (
                    listingsToShow.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            listing={listing}
                        />
                    ))
                ) : searchActive ? (
                    <div className={styles.noResults}>
                        <div className={styles.noResultsContent}>
                            <h3>No properties found</h3>
                            <p>Try adjusting your search filters to see more results.</p>
                        </div>
                    </div>
                ) : (
                    <div className={styles.noListings}>
                        <div className={styles.noListingsContent}>
                            <h3>No listings available</h3>
                            <p>Check back soon for new property listings.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage; 