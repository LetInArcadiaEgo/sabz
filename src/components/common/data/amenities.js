import {
  FaBolt,
  FaWifi,
  FaFire,
  FaSnowflake,
  FaTree,
  FaMosque,
  FaSchool,
  FaClinicMedical,
  FaHospital,
  FaShieldAlt,
  FaVideo,
  FaTools,
  FaUserShield,
  FaHome,
  FaBox,
  FaCarSide,
} from 'react-icons/fa';

/*
 * Centralised amenity list with categories so any feature (wizard, detail page, etc.)
 * can display consistent labels/icons.
 */
export const AMENITIES = [
  // Utilities
  { id: 'power',      label: 'Electricity Backup',    icon: FaBolt,        category: 'Utilities' },
  { id: 'internet',   label: 'Fast Wifi',             icon: FaWifi,        category: 'Utilities' },
  { id: 'gas',        label: 'Sui Gas',               icon: FaFire,        category: 'Utilities' },
  { id: 'ac',         label: 'Air Conditioning',      icon: FaSnowflake,   category: 'Utilities' },

  // Recreation & Community
  { id: 'hospital',   label: 'Nearby Hospital',       icon: FaHospital,    category: 'Recreation & Community' },
  { id: 'mosque',     label: 'Nearby Mosque',         icon: FaMosque,      category: 'Recreation & Community' },
  { id: 'schools',    label: 'Nearby Schools',        icon: FaSchool,      category: 'Recreation & Community' },
  { id: 'dispensary', label: 'Nearby Medical Dispensary', icon: FaClinicMedical, category: 'Recreation & Community' },
  { id: 'garden',     label: 'Lawn or Garden',        icon: FaTree,        category: 'Recreation & Community' },

  // Security & Safety
  { id: 'gated',      label: 'Gated Community',       icon: FaShieldAlt,   category: 'Security & Safety' },
  { id: 'cctv',       label: 'CCTV Security',         icon: FaVideo,       category: 'Security & Safety' },
  { id: 'maintenance',label: 'Maintenance Staff',     icon: FaTools,       category: 'Security & Safety' },
  { id: 'security',   label: 'Security Staff',        icon: FaUserShield,  category: 'Security & Safety' },

  // Rooms & Spaces
  { id: 'servant',    label: 'Servant Room',          icon: FaHome,        category: 'Rooms & Spaces' },
  { id: 'store',      label: 'Store Room',            icon: FaBox,         category: 'Rooms & Spaces' },
  { id: 'parking',    label: 'Covered Parking',       icon: FaCarSide,     category: 'Rooms & Spaces' },
];

// Map by id for quick lookup
export const amenitiesMap = AMENITIES.reduce((acc, a) => {
  acc[a.id] = a;
  return acc;
}, {});

// ---- Aliases for common shorthand ids ----------------------------------
// Some legacy records may store "wifi" or "wi-fi" instead of "internet"
amenitiesMap.wifi  = amenitiesMap.internet;

// Helper: group amenities by category { Utilities: [...], ... }
export const groupAmenitiesByCategory = (ids = []) => {
  const groups = {};
  ids.forEach(id => {
    const amenity = amenitiesMap[id];
    if (!amenity) return;
    const { category } = amenity;
    if (!groups[category]) groups[category] = [];
    groups[category].push(amenity);
  });
  return groups;
}; 