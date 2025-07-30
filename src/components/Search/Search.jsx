import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './Search.module.css';
import SearchDropdown from './SearchDropdown';
import { useSearch } from '../../hooks/useSearch';

const Search = ({ 
  listings = [], 
  onSearchResults = () => {},
  onFiltersChange = () => {} 
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const searchRef = useRef(null);

  // Initialize search functionality
  const {
    isOpen,
    filters,
    filteredListings,
    resultCount,
    hasActiveFilters,
    updateFilter,
    clearAllFilters,
    openSearch,
    closeSearch,
    executeSearch
  } = useSearch(listings);

  // Notify parent component about search results and filter changes
  useEffect(() => {
    onSearchResults(filteredListings);
    onFiltersChange(filters, hasActiveFilters);
  }, [filteredListings, filters, hasActiveFilters, onSearchResults, onFiltersChange]);

  // Sticky header effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsSticky(e.intersectionRatio < 1);
      },
      { threshold: [1] }
    );

    if (searchRef.current) {
      observer.observe(searchRef.current);
    }

    return () => {
      if (searchRef.current) {
        observer.unobserve(searchRef.current);
      }
    };
  }, []);

  // Handle search bar click
  const handleSearchClick = () => {
    openSearch();
  };

  // Handle search execution
  const handleSearch = () => {
    executeSearch();
  };

  // Get placeholder text based on active filters
  const getPlaceholderText = () => {
    if (!hasActiveFilters) {
      return "Start your search";
    }

    const activeFilterNames = [];
    if (filters.propertyType) activeFilterNames.push(filters.propertyType);
    if (filters.priceRange) activeFilterNames.push('price');
    if (filters.bedrooms) activeFilterNames.push(`${filters.bedrooms} bed`);
    
    return activeFilterNames.length > 0 
      ? activeFilterNames.join(', ') 
      : "Start your search";
  };

  return (
    <>
      <div 
        ref={searchRef}
        className={`${styles.searchContainer} ${isSticky ? styles.sticky : ''}`}
      >
        <div 
          className={`${styles.searchBar} ${hasActiveFilters ? styles.hasFilters : ''}`}
          onClick={handleSearchClick}
        >
          <FiSearch className={styles.searchIcon} />
          <div className={styles.searchContent}>
            <span className={styles.searchText}>
              {getPlaceholderText()}
            </span>
            {hasActiveFilters && (
              <span className={styles.filterCount}>
                {resultCount} result{resultCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Search Dropdown */}
      <SearchDropdown
        isOpen={isOpen}
        filters={filters}
        resultCount={resultCount}
        hasActiveFilters={hasActiveFilters}
        onFilterChange={updateFilter}
        onClearAll={clearAllFilters}
        onSearch={handleSearch}
        onClose={closeSearch}
      />
    </>
  );
};

export default Search;