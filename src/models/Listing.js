import PropTypes from 'prop-types';

// Canonical listing shape - single source of truth
export const LISTING_DEFAULTS = {
  id: '',
  title: '',
  description: '',
  propertyType: 'house',
  bedrooms: 1,
  bathrooms: 1,
  totalArea: '',
  areaUnit: 'Sq Ft',
  price: '', // Keep as string for create flow compatibility
  address: {
    streetAddress: '', // Create flow expects streetAddress
    aptFloorBldg: '',  // Create flow expects aptFloorBldg
    city: '',
    state: '',
    postalCode: '',    // Create flow expects postalCode
    country: 'Pakistan'
  },
  images: [], // Use images for create flow compatibility
  photos: [], // Keep photos for edit flow compatibility
  amenities: [],
  locationDetails: '',
  status: 'pending'
};

// Reusable PropTypes shape
export const ListingPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  propertyType: PropTypes.string,
  bedrooms: PropTypes.number,
  bathrooms: PropTypes.number,
  totalArea: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  areaUnit: PropTypes.string,
  price: PropTypes.oneOfType([
    PropTypes.number, // Legacy API format
    PropTypes.shape({
      base: PropTypes.number,
      weeklyDiscount: PropTypes.number,
      monthlyDiscount: PropTypes.number
    })
  ]),
  address: PropTypes.shape({
    street: PropTypes.string,
    unit: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    country: PropTypes.string
  }),
  photos: PropTypes.arrayOf(PropTypes.string),
  amenities: PropTypes.arrayOf(PropTypes.string),
  locationDetails: PropTypes.string,
  status: PropTypes.string
});

/**
 * Normalize any listing data (from API, draft, etc.) to canonical shape
 * @param {Object} raw - Raw listing data from any source
 * @returns {Object} Clean listing object matching LISTING_DEFAULTS shape
 */
export function normalizeListing(raw) {
  if (!raw) return { ...LISTING_DEFAULTS };

  // Photos - handle multiple field names
  const photos = Array.isArray(raw.photos)
    ? raw.photos
    : Array.isArray(raw.images)
      ? raw.images
      : raw.image
        ? [raw.image]
        : [];

  // Property type - handle object or string
  const propertyTypeVal = raw.propertyType || raw.property_type;
  const propertyType = typeof propertyTypeVal === 'string'
    ? propertyTypeVal
    : (propertyTypeVal?.place || 'house');

  // Basic info fields - handle nested or flat
  const bedrooms = raw.basicInfo?.bedrooms || raw.bedrooms || LISTING_DEFAULTS.bedrooms;
  const bathrooms = raw.basicInfo?.bathrooms || raw.bathrooms || LISTING_DEFAULTS.bathrooms;
  const totalArea = raw.basicInfo?.totalArea || raw.totalArea || raw.total_area || LISTING_DEFAULTS.totalArea;
  const areaUnit = raw.basicInfo?.areaUnit || raw.areaUnit || raw.area_unit || LISTING_DEFAULTS.areaUnit;

  // Address - normalize field names
  const address = {
    street: raw.address?.streetAddress || raw.address?.street || LISTING_DEFAULTS.address.street,
    unit: raw.address?.aptFloorBldg || raw.address?.unit || LISTING_DEFAULTS.address.unit,
    city: raw.address?.city || LISTING_DEFAULTS.address.city,
    state: raw.address?.state || LISTING_DEFAULTS.address.state,
    zipCode: raw.address?.postalCode || raw.address?.zipCode || LISTING_DEFAULTS.address.zipCode,
    country: raw.address?.country || LISTING_DEFAULTS.address.country
  };

  // Price - convert primitive to object form
  const price = typeof raw.price === 'number'
    ? { base: raw.price, weeklyDiscount: 0, monthlyDiscount: 0 }
    : (raw.price || LISTING_DEFAULTS.price);

  return {
    ...LISTING_DEFAULTS,
    ...raw,
    propertyType,
    bedrooms,
    bathrooms,
    totalArea,
    areaUnit,
    address,
    photos,
    price,
    amenities: raw.amenities || LISTING_DEFAULTS.amenities
  };
}

/**
 * Convert normalized listing to backend API format
 * @param {Object} listing - Normalized listing object
 * @returns {Object} Listing data formatted for backend API
 */
export function listingToApiFormat(listing) {
  // Handle both images (create flow) and photos (normalized)
  const imageFiles = listing.images || listing.photos || [];
  
  // Handle price conversion - string, number, or object
  let priceValue = 0;
  if (typeof listing.price === 'object' && listing.price?.base) {
    priceValue = listing.price.base;
  } else if (typeof listing.price === 'string') {
    priceValue = parseInt(listing.price) || 0;
  } else if (typeof listing.price === 'number') {
    priceValue = listing.price;
  }

  // Map address fields to database column names
  const address = listing.address || {};

  return {
    title: listing.title,
    description: listing.description,
    price: priceValue,
    property_type: listing.propertyType,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    total_area: typeof listing.totalArea === 'number' ? listing.totalArea : (listing.totalArea ? Number(listing.totalArea) : null),
    area_unit: listing.areaUnit,
    amenities: listing.amenities || [],
    // Map address fields to flat database columns
    street_address: address.streetAddress || address.street || '',
    city: address.city || '',
    area: address.state || '', // "area" in DB maps to state/area in frontend
    postal_code: address.postalCode || address.zipCode || '',
    status: listing.status || 'pending'
  };
} 