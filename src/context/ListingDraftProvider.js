import { createContext, useContext, useState } from 'react';

const ListingDraftContext = createContext();

export function ListingDraftProvider({ children }) {
  const [draft, setDraft] = useState({

    title:        '',
    description:  '',
    propertyType: '',
    bedrooms:     1,
    bathrooms:    1,
    totalArea:    '',
    areaUnit:     'Sq Ft',
    price:        '',    

    // Backend expects a nested address object ----------------------------
    address: {
      city:          '',
      state:         '',
      streetAddress: '',
      aptFloorBldg:  '',
      postalCode:    ''
    },

    images:       [],    // files selected in Step-2 / Photos
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

