import { createContext, useContext, useState } from 'react';
import { LISTING_DEFAULTS, normalizeListing } from '../models/Listing';

const ListingDraftContext = createContext();

export function ListingDraftProvider({ children, initialDraft = null }) {
  const [draft, setDraft] = useState(
    initialDraft ? normalizeListing(initialDraft) : { ...LISTING_DEFAULTS }
  );

  return (
    <ListingDraftContext.Provider value={{ draft, setDraft }}>
      {children}
    </ListingDraftContext.Provider>
  );
}

export function useListingDraft() {
  return useContext(ListingDraftContext);
}

