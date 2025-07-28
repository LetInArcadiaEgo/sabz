import { FaHome, FaBuilding, FaBed } from 'react-icons/fa';
import { MdHouse, MdArrowUpward, MdArrowDownward, MdLocationOn } from 'react-icons/md';


/*
 * Central source-of-truth for property type choices across the app.
 * Each entry provides:
 *   id    – stored in DB / draft
 *   label – human-friendly text
 *   icon  – React component (from react-icons) to render
 */
export const PROPERTY_TYPES = [
  { id: 'house',     label: 'House',         icon: FaHome },
  { id: 'flat',      label: 'Flat',          icon: FaBuilding },
  { id: 'upper',     label: 'Upper Portion', icon: MdArrowUpward },
  { id: 'lower',     label: 'Lower Portion', icon: MdArrowDownward },
  { id: 'room',      label: 'Room',          icon: FaBed },
  { id: 'plot',      label: 'Plot',          icon: MdLocationOn },
  { id: 'farmhouse', label: 'Farm House',    icon: MdHouse },
];

export const propertyTypeMap = PROPERTY_TYPES.reduce((acc, t) => {
  acc[t.id] = t;
  return acc;
}, {}); 