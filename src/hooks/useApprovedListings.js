import { useEffect, useState } from 'react';
import { fetchApproved } from '../api';

export function useApprovedListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchApproved();
        setListings(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { listings, loading, error };
} 