import React from 'react';
import styles from './SearchDropdown.module.css';
import PropertyTypeFilter from './filters/PropertyTypeFilter';
import PriceRangeFilter from './filters/PriceRangeFilter';
import BedroomFilter from './filters/BedroomFilter';

const SearchDropdown = ({ 
  isOpen, 
  filters, 
  resultCount, 
  hasActiveFilters,
  onFilterChange, 
  onClearAll, 
  onSearch, 
  onClose 
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div className={styles.backdrop} onClick={handleBackdropClick} />
      
      {/* Dropdown content */}
      <div className={styles.dropdown}>
        <div className={styles.header}>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close search"
          >
            ✕
          </button>
          <h2 className={styles.title}>Find your perfect home</h2>
        </div>

        <div className={styles.content}>
          {/* Property Type Filter */}
          <div className={styles.filterSection}>
            <h3 className={styles.sectionTitle}>What type of property?</h3>
            <PropertyTypeFilter
              value={filters.propertyType}
              onChange={(value) => onFilterChange('propertyType', value)}
            />
          </div>

          {/* Price Range Filter */}
          <div className={styles.filterSection}>
            <h3 className={styles.sectionTitle}>What's your budget?</h3>
            <PriceRangeFilter
              value={filters.priceRange}
              onChange={(value) => onFilterChange('priceRange', value)}
            />
          </div>

          {/* Bedroom Filter */}
          <div className={styles.filterSection}>
            <h3 className={styles.sectionTitle}>How many bedrooms?</h3>
            <BedroomFilter
              value={filters.bedrooms}
              onChange={(value) => onFilterChange('bedrooms', value)}
            />
          </div>
        </div>

        {/* Footer with actions */}
        <div className={styles.footer}>
          <button 
            className={styles.clearButton}
            onClick={onClearAll}
            disabled={!hasActiveFilters}
          >
            Clear All
          </button>
          
          <button 
            className={styles.searchButton}
            onClick={onSearch}
          >
            🔍 Search {resultCount > 0 ? `(${resultCount})` : ''}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchDropdown;