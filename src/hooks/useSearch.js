import { useState, useEffect, useMemo } from 'react';
import { filterListings } from '../utils/searchUtils';

export function useSearch(allListings = []) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: null,
    priceRange: null,
    bedrooms: null,
    areaRange: null,
    amenities: []
  });

  // Filtered listings based on current filters
  const { filteredListings, resultCount } = useMemo(() => {
    if (!allListings.length) {
      return { filteredListings: [], resultCount: 0 };
    }

    // If no filters are active, return all listings
    const hasActiveFilters = Object.values(filters).some(filter => {
      if (Array.isArray(filter)) return filter.length > 0;
      return filter !== null && filter !== undefined;
    });

    if (!hasActiveFilters) {
      return { filteredListings: allListings, resultCount: allListings.length };
    }

    const filtered = filterListings(allListings, filters);
    return { filteredListings: filtered, resultCount: filtered.length };
  }, [allListings, filters]);

  // Update individual filter
  const updateFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      propertyType: null,
      priceRange: null,
      bedrooms: null,
      areaRange: null,
      amenities: []
    });
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(filter => {
      if (Array.isArray(filter)) return filter.length > 0;
      return filter !== null && filter !== undefined;
    });
  }, [filters]);

  // Open/close dropdown
  const openSearch = () => setIsOpen(true);
  const closeSearch = () => setIsOpen(false);
  const toggleSearch = () => setIsOpen(prev => !prev);

  // Handle search execution
  const executeSearch = () => {
    closeSearch();
    // Additional search logic can be added here (analytics, URL updates, etc.)
  };

  return {
    // State
    isOpen,
    filters,
    filteredListings,
    resultCount,
    hasActiveFilters,
    
    // Actions
    updateFilter,
    clearAllFilters,
    openSearch,
    closeSearch,
    toggleSearch,
    executeSearch
  };
}