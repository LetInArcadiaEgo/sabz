import { createContext, useContext, useState } from 'react';

const ListingDraftContext = createContext();

export function ListingDraftProvider({ children }) {
  const [draft, setDraft] = useState({
    // sensible defaults – add more when you build new steps
    title:        '',
    description:  '',
    propertyType: '',
    bedrooms:     1,
    bathrooms:    1,
    totalArea:    '',
    areaUnit:     'Sq Ft',
    price:        '',    // you’ll set this in Step-2
    images:       [],    // later
  });

  return (
    <ListingDraftContext.Provider value={{ draft, setDraft }}>
      {children}
    </ListingDraftContext.Provider>
  );
}

export function useListingDraft() {
  return useContext(ListingDraftContext);
}

