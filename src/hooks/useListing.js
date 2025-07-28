import { useEffect, useState } from 'react';
import { fetchListing } from '../api';

export function useListing(id) {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const data = await fetchListing(id);
        setListing(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch listing');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return { listing, loading, error };
} 