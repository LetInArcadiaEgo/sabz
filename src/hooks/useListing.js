import { useQuery } from '@tanstack/react-query';
import { fetchListing } from '../api';
import { normalizeListing } from '../models/Listing';

export function useListing(id) {
  return useQuery({
    queryKey: ['listing', id],
    enabled: !!id,
    queryFn: async () => normalizeListing(await fetchListing(id)),
  });
} 