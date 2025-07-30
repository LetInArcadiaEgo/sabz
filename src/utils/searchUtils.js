/**
 * Search and filtering utilities for the property marketplace
 */

// Price range presets (in PKR)
export const PRICE_PRESETS = [
  { id: 'under-50l', label: 'Under 50L', min: 0, max: 5000000 },
  { id: '50l-1cr', label: '50L - 1Cr', min: 5000000, max: 10000000 },
  { id: '1cr-2cr', label: '1Cr - 2Cr', min: 10000000, max: 20000000 },
  { id: '2cr-plus', label: '2Cr+', min: 20000000, max: Infinity },
  { id: 'custom', label: 'Custom Range', min: null, max: null }
];

// Area size presets (in Marla)
export const AREA_PRESETS = [
  { id: '3-5', label: '3-5 Marla', min: 3, max: 5 },
  { id: '5-10', label: '5-10 Marla', min: 5, max: 10 },
  { id: '10-20', label: '10-20 Marla', min: 10, max: 20 },
  { id: '1-kanal', label: '1+ Kanal', min: 20, max: Infinity }
];

// Convert Marla to Sq Ft and vice versa
export const MARLA_TO_SQFT = 272.25;
export const SQFT_TO_MARLA = 1 / MARLA_TO_SQFT;

export function convertArea(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  
  if (fromUnit === 'marla' && toUnit === 'sqft') {
    return value * MARLA_TO_SQFT;
  }
  
  if (fromUnit === 'sqft' && toUnit === 'marla') {
    return value * SQFT_TO_MARLA;
  }
  
  return value;
}

/**
 * Check if listing matches property type filter
 */
function matchesPropertyType(listing, propertyTypeFilter) {
  if (!propertyTypeFilter) return true;
  
  const listingType = listing.propertyType || listing.property_type;
  return listingType === propertyTypeFilter;
}

/**
 * Check if listing matches price range filter
 */
function matchesPriceRange(listing, priceRangeFilter) {
  if (!priceRangeFilter) return true;
  
  const listingPrice = typeof listing.price === 'object' 
    ? listing.price.base 
    : (typeof listing.price === 'string' ? parseInt(listing.price) : listing.price);
    
  if (!listingPrice || listingPrice <= 0) return false;
  
  const { min, max } = priceRangeFilter;
  
  if (min !== null && listingPrice < min) return false;
  if (max !== null && max !== Infinity && listingPrice > max) return false;
  
  return true;
}

/**
 * Check if listing matches bedroom count filter
 */
function matchesBedrooms(listing, bedroomFilter) {
  if (!bedroomFilter || bedroomFilter === 'any') return true;
  
  const listingBedrooms = listing.bedrooms;
  
  // Handle "5+" case
  if (bedroomFilter === '5+') {
    return listingBedrooms >= 5;
  }
  
  return listingBedrooms === parseInt(bedroomFilter);
}

/**
 * Check if listing matches area range filter
 */
function matchesAreaRange(listing, areaRangeFilter) {
  if (!areaRangeFilter) return true;
  
  const listingArea = listing.totalArea || listing.total_area;
  const listingUnit = listing.areaUnit || listing.area_unit || 'sqft';
  
  if (!listingArea || listingArea <= 0) return false;
  
  const { min, max, unit } = areaRangeFilter;
  
  // Convert listing area to filter unit for comparison
  const normalizedListingArea = convertArea(
    parseFloat(listingArea), 
    listingUnit.toLowerCase(), 
    unit.toLowerCase()
  );
  
  if (min !== null && normalizedListingArea < min) return false;
  if (max !== null && max !== Infinity && normalizedListingArea > max) return false;
  
  return true;
}

/**
 * Check if listing matches amenities filter
 */
function matchesAmenities(listing, amenitiesFilter) {
  if (!amenitiesFilter || amenitiesFilter.length === 0) return true;
  
  const listingAmenities = listing.amenities || [];
  
  // Check if listing has all required amenities (AND logic)
  return amenitiesFilter.every(requiredAmenity => 
    listingAmenities.includes(requiredAmenity)
  );
}

/**
 * Main filtering function
 * Applies all active filters to a list of listings
 */
export function filterListings(listings, filters) {
  if (!listings || listings.length === 0) return [];
  
  return listings.filter(listing => {
    return (
      matchesPropertyType(listing, filters.propertyType) &&
      matchesPriceRange(listing, filters.priceRange) &&
      matchesBedrooms(listing, filters.bedrooms) &&
      matchesAreaRange(listing, filters.areaRange) &&
      matchesAmenities(listing, filters.amenities)
    );
  });
}

/**
 * Get price preset by ID
 */
export function getPricePreset(presetId) {
  return PRICE_PRESETS.find(preset => preset.id === presetId);
}

/**
 * Get area preset by ID
 */
export function getAreaPreset(presetId) {
  return AREA_PRESETS.find(preset => preset.id === presetId);
}

/**
 * Format price range for display
 */
export function formatPriceRange(priceRange) {
  if (!priceRange) return '';
  
  const { min, max } = priceRange;
  
  if (min === 0 && max === Infinity) return 'Any Price';
  if (min === 0) return `Under ${formatPrice(max)}`;
  if (max === Infinity) return `${formatPrice(min)}+`;
  
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

/**
 * Format price in lakhs/crores
 */
export function formatPrice(amount) {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(1)}Cr`;
  }
  if (amount >= 100000) {
    return `${(amount / 100000).toFixed(1)}L`;
  }
  return `${amount.toLocaleString()}`;
}

/**
 * Format area range for display
 */
export function formatAreaRange(areaRange) {
  if (!areaRange) return '';
  
  const { min, max, unit } = areaRange;
  const unitLabel = unit === 'marla' ? 'Marla' : 'Sq Ft';
  
  if (min === null && max === null) return '';
  if (min === null) return `Under ${max} ${unitLabel}`;
  if (max === null || max === Infinity) return `${min}+ ${unitLabel}`;
  
  return `${min}-${max} ${unitLabel}`;
}